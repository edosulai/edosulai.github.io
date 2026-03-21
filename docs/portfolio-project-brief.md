# Portfolio Website — Project Brief & Continuation Notes

> File ini adalah catatan lengkap proyek rebuilding portfolio website edosulai.github.io.
> Gunakan file ini sebagai context saat melanjutkan pekerjaan di sesi berikutnya.

---

## 1. Project Overview

**Goal**: Membangun portfolio website yang bercerita (storytelling-driven), bukan sekadar daftar project/CV. Website harus menggugah emosi pembaca — haru dan terinspirasi — tanpa mengekspos detail kehidupan pribadi secara vulgar atau berubah menjadi autobiografi literal.

**Repo**: `personal/edosulai.github.io`  
**Live URL**: https://edosulai.github.io  
**Deployment**: GitHub Pages (static export)

---

## 2. Tech Stack (Existing)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (Pages Router) |
| Export | Static (`output: 'export'`) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 |
| Animations | **GSAP 3.12.5** + ScrollTrigger + ScrollToPlugin (dari CDN) |
| Fonts | Inter (body) + Playfair Display (headings/quotes) |
| Hosting | GitHub Pages |

---

## 3. Design Direction

### Prinsip Utama
1. **Storytelling, bukan CV** — Scroll = perjalanan hidup, abstrak & evocative
2. **Privasi** — Jangan ceritakan detail kehidupan (membosankan + privasi). Gunakan metafora dan frasa abstrak
3. **Storytelling bukan autobiografi literal** — gunakan detail personal hanya sebagai simbol, framing, atau kontras yang memperkuat positioning
4. **GSAP wajib** — CSS-only ditolak. Semua animasi harus pakai GSAP ScrollTrigger
5. **Emotional target**: Haru (touching) + Terinspirasi → ketenangan di balik powerful masa depan

### Visual Duality
- **Desa/Alam**: tanah, air, cahaya → hijau, earthy, organic
- **Kota/Tech**: beton, besi, listrik → gray, metallic, electric
- **End state**: tech invisible, alam dominan → tech = magic yang samar

### Color Palette
```css
--earth: #3d5a3a;      --earth-light: #6b8f6a;
--soil: #8b7355;        --soil-light: #c4a97d;
--dawn: #e8a87c;        --ember: #c45c3c;
--steel: #4a5568;       --electric: #60a5fa;
--muted: #8b8478;       --dim: #4a4640;
--warm: #f5f0e8;
```

### Typography
- Body: `Inter` (300–700)
- Headings/Quotes: `Playfair Display` (400, 700, italic)

### Music/Mood Reference
- Study/work mood: https://www.youtube.com/@HDSounDI
- Emotional tone: https://youtu.be/uD4izuDMUQA

---

## 4. Content — Abstract Chapter Structure

Semua 4 design variant menggunakan konten yang sama. **Ini bukan biografi detail atau cerita hidup lengkap — ini frasa abstrak yang mewakili fase kehidupan.**

| Chapter | Title | Content |
|---------|-------|---------|
| Prologue | — | *"I longed for wings, not gold. But the sky said: pay first."* |
| I | Akar | The story began far from the usual centers of access and advantage. The ground stayed close. **The soil remembers.** |
| II | Api Kecil | Some fires don't need wood. *One word is enough.* The ones who were underestimated burn the longest. |
| III | Percikan | Curiosity first arrived through dismantled machines and unfinished experiments. Systems were learned by touch before they were understood by language. *But the seed was planted.* |
| IV | Tercerahkan | Failed the test. **Found the direction.** Sometimes the door that closes shows you which wall to break. |
| V | Mendaki | The climb began before institutions could name it. *Cum Laude.* When the world slowed down, the learning only accelerated for someone already fluent in solitude. Tags: Python, TensorFlow, Deep Learning |
| VI | Dunia Nyata | **Banking-grade systems.** Payroll engines, mass transfers, encrypted pipelines. The village kid writing code that moves a nation's money. Sub: 3,500+ commits · Millions of transactions. Tags: Golang, React, gRPC, PostgreSQL, Microservices |
| VII | Visi | An AI-first company. Systems that run themselves. **Humans ideate. AI builds. AI ships.** |
| VIII | Kembali ke Tanah | A house near the ocean. Green everywhere. Technology running silently — **like invisible magic.** Only the waves are heard. Closing: *But this time — with wings.* |

---

## 5. Four Design Variants (GSAP Preview Files)

Semua file ada di root repo sebagai standalone HTML previews. Buka langsung di browser.

### Design A — Parallax Depth Zoom
**File**: `preview-d-a-parallax-zoom.html`  
**Mekanisme**: Vertical scroll, concentric depth circles yang membesar saat scroll, per-panel parallax (yPercent + scale), snap scrolling.  
**Navigasi**: Left progress bar + right side nav dots with hover labels.  
**Karakter**: Meditatif, zoom-into-the-soul feel. Circles mengembang seolah masuk lebih dalam ke cerita.

### Design B — Horizontal Storytelling
**File**: `preview-d-b-horizontal.html`  
**Mekanisme**: Vertical intro (quote) → pinned horizontal scroll section (8 panel, ScrollTrigger pin) → vertical outro.  
**Navigasi**: Bottom timeline bar with progress gradient + clickable dots.  
**Karakter**: Cinematic, film-roll feel. Horizontal = perjalanan waktu linear.

### Design C — Scene Transitions (Unique Per-Chapter)
**File**: `preview-d-c-scene-transition.html`  
**Mekanisme**: 9 scenes vertikal, masing-masing punya animasi masuk yang UNIK:
- Prologue: scale-in
- Akar: rise-from-bottom
- Api Kecil: rotate-in + ember particle canvas
- Percikan: slide-from-right
- Tercerahkan: expand-from-center
- Mendaki: stagger-children
- Dunia Nyata: clip-path wipe
- Visi: blur-glow
- Kembali: slow-parallax-fade

**Navigasi**: Left side nav (line + label) + right progress bar.  
**Karakter**: Theatrical, setiap chapter punya personality sendiri. Most visually diverse.

### Design D — Hybrid Cosmic Zoom
**File**: `preview-d-d-hybrid-zoom.html`  
**Mekanisme**: 
- 400vh zoom intro (pinned): cosmos text → zoom through concentric rings → quote → origin label
- 7 chapter scenes: fade-in/out + parallax backgrounds
- 300vh zoom outro (pinned): reverse zoom with quote + closing

**Navigasi**: SVG progress ring (top-right) + side nav dots.  
**Karakter**: Cosmic, grand-scale. Feels like zooming from the universe into one person's story, then zooming back out.

---

## 6. Key Source Files

| File | Purpose |
|------|---------|
| `edo-portfolio-philosophy.md` | Raw life story + design brief (PRIVATE — source of truth, NOT for public display) |
| `docs/portfolio-project-brief.md` | This file — project documentation for continuation |
| `docs/edo-story-polished.md` | Polished & literary version of Edo's life story (PRIVATE reference) |
| `pages/api/resume.ts` | API route with CV data (updated with latest career info) |
| `preview-d-a-parallax-zoom.html` | Design A preview |
| `preview-d-b-horizontal.html` | Design B preview |
| `preview-d-c-scene-transition.html` | Design C preview |
| `preview-d-d-hybrid-zoom.html` | Design D preview |

---

## 7. Career Data Summary (for reference)

### BRI — QLola / QCash (Jun 2023 ~ Feb 2025)
- Under: Steradian → KSPS (vendor)
- 3,500+ commits across 525 repos
- Full-stack: React/Next.js frontend, Golang backend
- Key: Payroll Transfer, Mass Transfer SWIFT/BIFast, GnuPG encryption
- Tech: React, Next.js, Golang, gRPC/Protobuf, PostgreSQL, SFTP, Docker, micro-frontend

### BRI — BRiSpot / BNS (Jan 2026 ~ Present)
- Under: Steradian → KSPS (kembali ke BRI, project baru)
- 2,800+ total commits across 28 repos; Edo: 197 commits across 20 repos
- Architected centralized endpoint pattern with unified protobuf contracts
- Migrated all service DTOs to protobuf via `bns-api-catalog` submodule
- Built centralized clients for external services (CISO, Bristars, EDM, Zoloz, OIDC)
- Designed `bns-event-contracts` — Kafka event schema proto repo
- Mobile: React Native 0.83, TypeScript, Redux, Datadog, CodePush
- Backend: Golang, gRPC/Protobuf, Kafka, Kong API Gateway, Docker

### Kreditplus — KB FMF (Jul 2025 ~ Jan 2026)
- Under: SIGMATECH
- 156+ commits across 8 repos
- Auth system, masterdata insurance, account management, loan origination
- Tech: Golang, PostgreSQL, Redis, Grafana, gRPC/Protobuf

### Pinturakik — Momena (2025 ~ Present)
- Personal company, AI-first automation platform
- 113 commits across 8 repos
- AI context system, Linear integration, health check automation
- Tech: Golang, Protobuf, AI/LLM, Android (Kotlin), iOS (Swift)

### Total Professional Commits: ~4,300+ across 81 repositories

---

## 8. Technical Notes

### GSAP CDN URLs
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
```

### GSAP Pattern Cheatsheet
```js
// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Snap scroll
ScrollTrigger.create({
  snap: { snapTo: 1/(n-1), duration: {min:0.2, max:0.6}, ease:'power1.inOut' }
});

// Scrub animation
gsap.fromTo(el, {opacity:0, y:60}, {
  opacity:1, y:0,
  scrollTrigger: { trigger, start:'top 80%', end:'top 30%', scrub:1.5 }
});

// Pinned section
ScrollTrigger.create({
  trigger, start:'top top', end:'+=' + totalWidth,
  pin: true, scrub: 1.2
});
```

### File Write Gotcha
**JANGAN gunakan heredoc (`cat << 'EOF'`) via terminal untuk menulis file HTML besar.** Heredoc akan gagal secara silent karena escaping issues. **Gunakan `create_file` tool.** Jika perlu overwrite file yang sudah ada, hapus dulu dengan `rm` lalu `create_file`.

---

## 9. Next Steps (Continuation Plan)

1. **User picks a design** — Buka keempat preview di browser, pilih satu (atau hybrid)
2. **Implement di Next.js** — Convert chosen HTML preview ke React/TypeScript components
   - Install GSAP sebagai npm dependency (bukan CDN)
   - Buat components: `ScrollScene`, `NavigationDots`, `ProgressBar`, dll
   - Integrate dengan Tailwind CSS existing
   - Perhatikan static export compatibility
3. **Polish content** — Setelah design dipilih, refine copywriting per-chapter
4. **Responsive** — Test & optimize mobile experience
5. **Deploy** — Push ke GitHub, verify di edosulai.github.io

---

## 10. User Directives (Wajib Diikuti)

1. ❌ **Jangan ceritakan hidup detail di website** — boring + privasi. Gunakan metafora.
2. ❌ **Jangan ubah storytelling menjadi autobiografi literal** — ambil hanya detail yang memperkuat arc publik.
3. ✅ **GSAP wajib** — Semua animasi ScrollTrigger/ScrollToPlugin, bukan CSS-only.
4. ✅ **Cek git commits** — Untuk depth profesional, bukan LinkedIn.
5. ✅ **File harus masuk git** — Jangan hanya simpan di `/memories/`, harus di repo.
6. ✅ **Konten abstrak** — "The village kid writing code that moves a nation's money" — bukan "Saya kerja di BRI dari Juni 2023".

---

## 11. LinkedIn Data (Partial)
- **Title**: Full Stack Engineer | React.js & Flutter | Node.js & Golang
- **About**: "With 2+ years of experience, I specialize in developing and optimizing scalable applications using microfrontend and microservices architectures."
- Note: LinkedIn scraping was blocked; data obtained via web search. Full profile data limited.

---

*Last updated: 19 Maret 2026*
*Generated by AI assistant — source of truth for project continuation*
