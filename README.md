# edosulai.github.io

Personal portfolio site with a cinematic scroll-storytelling experience and direct CV access.

## Stack

- **Next.js 16** (static export target)
- **React 19**
- **Tailwind CSS 4** (CSS-first setup)
- **TypeScript 6**
- **GSAP** for reveal and scroll choreography

## Development

```bash
npm install
npm run dev
npm run build
npm run build:pdf
```

## Project Surface

- `pages/index.tsx` -> 8-chapter storytelling homepage
- `pages/resume/` -> in-site resume viewer
- `data/site-content.json` -> portfolio narrative content
- `data/resume-content.json` -> resume content source
- `styles/globals.css` -> visual system, slide behavior, and motion styling
- `public/resume.html` -> printable resume source
- `public/resume.pdf` -> generated CV artifact

## Deploy

Deployment is automated via GitHub Actions to GitHub Pages.

## Notes

- This repository is the public portfolio surface.
- Some enterprise implementation details remain private.
