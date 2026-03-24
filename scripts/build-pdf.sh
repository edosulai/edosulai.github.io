#!/usr/bin/env bash
set -euo pipefail

# Build compressed PDF from resume.html
# Requires: Chromium-based browser + Ghostscript (gs)
# Usage: ./scripts/build-pdf.sh [port]

PORT="${1:-8766}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PUBLIC_DIR="$PROJECT_DIR/public"
TMP_PDF="$PUBLIC_DIR/.resume-raw.pdf"
OUT_PDF="$PUBLIC_DIR/resume.pdf"
URL="http://localhost:$PORT/resume.html"

# Find a Chromium-based browser
find_browser() {
  for candidate in \
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
    "/Applications/Chromium.app/Contents/MacOS/Chromium"; do
    if [[ -x "$candidate" ]]; then
      echo "$candidate"
      return 0
    fi
  done
  echo "ERROR: No Chromium-based browser found" >&2
  return 1
}

# Check dependencies
if ! command -v gs &>/dev/null; then
  echo "ERROR: Ghostscript (gs) not found. Install with: brew install ghostscript" >&2
  exit 1
fi

BROWSER="$(find_browser)"
echo "[build-pdf] Using browser: $(basename "$BROWSER")"

# Check if server is running
if ! curl -s -o /dev/null -w '' "http://localhost:$PORT" 2>/dev/null; then
  echo "[build-pdf] Starting temporary server on port $PORT..."
  python3 -m http.server "$PORT" --directory "$PUBLIC_DIR" &
  SERVER_PID=$!
  trap "kill $SERVER_PID 2>/dev/null" EXIT
  sleep 1
fi

# Generate raw PDF
echo "[build-pdf] Generating PDF from $URL..."
"$BROWSER" --headless --disable-gpu \
  --print-to-pdf="$TMP_PDF" \
  --no-margins \
  --print-background \
  "$URL" 2>/dev/null

RAW_SIZE=$(wc -c < "$TMP_PDF" | tr -d ' ')
echo "[build-pdf] Raw PDF: ${RAW_SIZE} bytes ($((RAW_SIZE / 1024)) KB)"

# Compress with Ghostscript
echo "[build-pdf] Compressing with Ghostscript..."
gs -sDEVICE=pdfwrite \
  -dCompatibilityLevel=1.4 \
  -dPDFSETTINGS=/ebook \
  -dNOPAUSE -dBATCH -dQUIET \
  -dColorImageResolution=150 \
  -dGrayImageResolution=150 \
  -dMonoImageResolution=150 \
  -sOutputFile="$OUT_PDF" \
  "$TMP_PDF"

# Clean up raw PDF
COMP_SIZE=$(wc -c < "$OUT_PDF" | tr -d ' ')
echo "[build-pdf] Compressed PDF: ${COMP_SIZE} bytes ($((COMP_SIZE / 1024)) KB)"
echo "[build-pdf] Saved: $(( (RAW_SIZE - COMP_SIZE) * 100 / RAW_SIZE ))%"
echo "[build-pdf] Output: $OUT_PDF"

# Remove temp file
[[ -f "$TMP_PDF" ]] && unlink "$TMP_PDF"
