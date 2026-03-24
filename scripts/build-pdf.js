#!/usr/bin/env node
/**
 * Build a single-page, full-bleed, compressed PDF from resume.html
 *
 * - Launches a local Chromium-based browser via puppeteer-core
 * - Measures the exact .cv element dimensions
 * - Generates a single-page PDF with those dimensions (no margins, no page breaks)
 * - Compresses with Ghostscript
 *
 * Usage: node scripts/build-pdf.js [port]
 * Requires: Chromium-based browser + Ghostscript (gs)
 */

const puppeteer = require("puppeteer-core");
const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = process.argv[2] || "8766";
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const RAW_PDF = path.join(PUBLIC_DIR, ".resume-raw.pdf");
const OUT_PDF = path.join(PUBLIC_DIR, "resume.pdf");
const URL = `http://localhost:${PORT}/resume.html`;

/** Find installed Chromium-based browser */
function findBrowser() {
  const candidates = [
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  // Linux / other
  for (const name of [
    "google-chrome",
    "google-chrome-stable",
    "chromium-browser",
    "chromium",
  ]) {
    try {
      const p = execSync(`which ${name} 2>/dev/null`).toString().trim();
      if (p) return p;
    } catch {}
  }
  throw new Error("No Chromium-based browser found");
}

/** Check if server is already running */
async function isServerRunning() {
  try {
    await fetch(`http://localhost:${PORT}`, { signal: AbortSignal.timeout(1000) });
    return true;
  } catch {
    return false;
  }
}

/** Start a temporary HTTP server */
function startServer() {
  const srv = spawn("python3", ["-m", "http.server", PORT, "--directory", PUBLIC_DIR], {
    stdio: "ignore",
    detached: true,
  });
  srv.unref();
  return srv;
}

async function main() {
  const browserPath = findBrowser();
  console.log(`[build-pdf] Browser: ${path.basename(browserPath)}`);

  // Check Ghostscript
  try {
    execSync("which gs", { stdio: "ignore" });
  } catch {
    console.error("ERROR: Ghostscript (gs) not found. Install with: brew install ghostscript");
    process.exit(1);
  }

  // Ensure server is running
  let server = null;
  if (!(await isServerRunning())) {
    console.log(`[build-pdf] Starting temporary server on port ${PORT}...`);
    server = startServer();
    await new Promise((r) => setTimeout(r, 1500));
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: browserPath,
      headless: true,
      args: ["--no-sandbox", "--disable-gpu", "--disable-software-rasterizer"],
    });

    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });

    // Measure the .cv container's exact rendered dimensions
    const dims = await page.evaluate(() => {
      const cv = document.querySelector(".cv");
      const rect = cv.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });

    console.log(`[build-pdf] Content dimensions: ${dims.width.toFixed(0)}x${dims.height.toFixed(0)} px`);

    // Inject print-specific CSS: remove body padding, set background, prevent page breaks
    await page.evaluate((w, h) => {
      const style = document.createElement("style");
      style.textContent = `
        @page { margin: 0; size: ${w}px ${h}px; }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: none !important;
            width: ${w}px !important;
            height: ${h}px !important;
            overflow: hidden !important;
          }
          .cv {
            box-shadow: none !important;
            margin: 0 !important;
            width: ${w}px !important;
            height: ${h}px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          * {
            page-break-inside: avoid !important;
          }
        }
      `;
      document.head.appendChild(style);
    }, dims.width, dims.height);

    // Generate single-page PDF with exact content dimensions
    await page.pdf({
      path: RAW_PDF,
      width: `${dims.width}px`,
      height: `${dims.height}px`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: false,
    });

    const rawSize = fs.statSync(RAW_PDF).size;
    console.log(`[build-pdf] Raw PDF: ${rawSize} bytes (${Math.round(rawSize / 1024)} KB)`);

    // Compress with Ghostscript
    console.log("[build-pdf] Compressing with Ghostscript...");
    execSync(
      `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook ` +
      `-dNOPAUSE -dBATCH -dQUIET ` +
      `-dColorImageResolution=150 -dGrayImageResolution=150 -dMonoImageResolution=150 ` +
      `-sOutputFile="${OUT_PDF}" "${RAW_PDF}"`
    );

    const compSize = fs.statSync(OUT_PDF).size;
    const saved = Math.round(((rawSize - compSize) / rawSize) * 100);
    console.log(`[build-pdf] Compressed: ${compSize} bytes (${Math.round(compSize / 1024)} KB)`);
    console.log(`[build-pdf] Saved: ${saved}%`);
    console.log(`[build-pdf] Output: ${OUT_PDF}`);

    // Cleanup raw
    if (fs.existsSync(RAW_PDF)) fs.unlinkSync(RAW_PDF);
  } finally {
    if (browser) await browser.close();
    if (server) server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
