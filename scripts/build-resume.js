#!/usr/bin/env node
/**
 * build-resume.js
 *
 * Reads data/resume-content.json (synced from edo-knowledge) and
 * public/resume.html (template with SYNC markers), then replaces
 * content between <!-- SYNC:BEGIN:xxx --> / <!-- SYNC:END:xxx --> markers.
 *
 * Keeps all CSS, SVGs, and visual design from the template intact.
 * Only dynamic data sections (header, contact texts, summary, experiences,
 * education) are replaced.
 *
 * Usage: node scripts/build-resume.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'data', 'resume-content.json');
const TEMPLATE_PATH = path.join(ROOT, 'public', 'resume.html');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildExperiencesHtml(experiences) {
  return experiences.map(exp => {
    // Build company link — use known URLs or omit href
    const companyUrls = {
      'Bank Rakyat Indonesia (via Indocyber Global Teknologi)': 'https://bri.co.id',
      'Indocyber Global Teknologi': 'https://indocyber.co.id',
      'PT KB Finansia Multifinance (via SIGMATECH)': 'https://www.kreditplus.com',
      'SIGMATECH': 'https://sigma-tech.co.id',
      'Bank Rakyat Indonesia (via Steradian Data Optima)': 'https://bri.co.id',
      'Steradian Data Optima': 'https://steradian.co.id',
    };

    const url = companyUrls[exp.company] || '';
    const companyHtml = url
      ? `<a href="${url}" target="_blank" rel="noopener">${escapeHtml(exp.company)}</a>`
      : escapeHtml(exp.company);

    // Format dates: "January 2026 to Present" → "January 2026 - Present"
    const dates = exp.dates.replace(' to ', ' - ');

    // Build description from first bullet or join all
    const desc = exp.bullets.map(b => escapeHtml(b)).join(' ');

    return `            <div class="exp-item">
              <div class="exp-role">${escapeHtml(exp.role)} @ ${companyHtml}</div>
              <div class="exp-meta">${escapeHtml(dates)}</div>
              <div class="exp-desc">${desc}</div>
            </div>`;
  }).join('\n\n');
}

function buildEducationHtml(edu) {
  return `            <div class="edu-school"><a href="${edu.schoolUrl}" target="_blank" rel="noopener">${escapeHtml(edu.school)}</a></div>
            <div class="edu-detail">${escapeHtml(edu.period)} | ${escapeHtml(edu.degree)}</div>
            <div class="edu-table">
              <span class="edu-label">Major</span>
              <span class="edu-value">: ${escapeHtml(edu.major)}</span>
              <span class="edu-label">Minor</span>
              <span class="edu-value">: ${escapeHtml(edu.minor)}</span>
              <span class="edu-label">GPA</span>
              <span class="edu-value">: ${escapeHtml(edu.gpa)}</span>
            </div>`;
}

function replaceSync(html, section, content) {
  const beginMarker = `<!-- SYNC:BEGIN:${section} -->`;
  const endMarker = `<!-- SYNC:END:${section} -->`;
  const beginIdx = html.indexOf(beginMarker);
  const endIdx = html.indexOf(endMarker);

  if (beginIdx === -1 || endIdx === -1) {
    console.warn(`[build-resume] Warning: markers for ${section} not found, skipping`);
    return html;
  }

  const before = html.slice(0, beginIdx + beginMarker.length);
  const after = html.slice(endIdx);

  return before + '\n' + content + '\n' + after;
}

function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.log('[build-resume] No data/resume-content.json found, skipping resume build');
    return;
  }

  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  let html = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Replace header name
  html = replaceSync(html, 'HEADER_NAME', `        <h1 class="header-name">${escapeHtml(data.header.name)}</h1>`);

  // Replace header title
  html = replaceSync(html, 'HEADER_TITLE', `        <h2 class="header-title">${escapeHtml(data.header.title)}</h2>`);

  // Replace contact text values
  html = replaceSync(html, 'CONTACT_WEBSITE', `          ${escapeHtml(data.contact.website)}`);
  html = replaceSync(html, 'CONTACT_EMAIL', `          ${escapeHtml(data.contact.email)}`);
  html = replaceSync(html, 'CONTACT_PHONE', `          (+62) ${data.contact.phone.replace('+62 ', '')}`);
  html = replaceSync(html, 'CONTACT_LINKEDIN', `          ${escapeHtml(data.contact.linkedin)}`);
  html = replaceSync(html, 'CONTACT_LOCATION', `          ${escapeHtml(data.contact.location)}`);

  // Replace summary
  html = replaceSync(html, 'SUMMARY', `    <p class="summary">${escapeHtml(data.summary)}</p>`);

  // Replace experiences
  html = replaceSync(html, 'EXPERIENCES', buildExperiencesHtml(data.experiences));

  // Replace education
  html = replaceSync(html, 'EDUCATION', buildEducationHtml(data.education));

  fs.writeFileSync(TEMPLATE_PATH, html);
  console.log(`[build-resume] Updated ${TEMPLATE_PATH}`);
}

main();
