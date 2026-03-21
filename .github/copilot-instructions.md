# Copilot Instructions — edosulai.github.io

Personal portfolio / landing page for Edo Sulaiman, deployed to GitHub Pages as a static site.

## Tech Stack

- **Framework**: Next.js 15 (Pages Router) with `output: 'export'` (static HTML)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3 + PostCSS
- **Font**: Inter via `next/font/google`
- **Deployment**: GitHub Pages via GitHub Actions (`nextjs.yml`)
- **Package manager**: npm

## Project Conventions

### File & Naming

- Components: kebab-case files (`social-link.tsx`), named exports (`export const SocialLink`).
- Barrel exports via `index.ts` in `components/`, `types/`, `constants/`.
- Import alias: `@/*` maps to project root.

### Component Patterns

- Use `React.FC<Props>` with a dedicated interface for props.
- Pages use default export functions; data fetching via `getStaticProps` (SSG only).

### Types

- Prefer `type` aliases over `interface` for data shapes.
- Shared types live in `types/` with barrel re-export.

### Styling

- Use Tailwind utility classes exclusively; avoid custom CSS unless animating (e.g. `keyframes`).
- Global CSS variables for foreground/background are defined in `styles/globals.css`.
- Dark mode follows `prefers-color-scheme`.

## Architecture Constraints

- **Static export only** — no server-side features, no middleware, no ISR.
  API routes under `pages/api/` are dead code in production; do not rely on them for runtime behavior.
- **No `app/` directory** — this project uses Pages Router. Do not create files under `app/`.
- Keep pages lightweight and SSG-compatible. Any data should be embedded at build time via `getStaticProps` or hardcoded in constants.

## Code Quality

- ESLint config extends `next/core-web-vitals`.
- TypeScript `strict: true`, target ES5, module ESNext, moduleResolution bundler.
- Do not add dependencies without justification. Prefer built-in Next.js / React / Tailwind capabilities first.

## Deployment

- Push to `main` triggers GitHub Actions build + deploy to GitHub Pages.
- Build output directory: `./out`.
- Node version: 18.18.0 (pinned in workflow).
