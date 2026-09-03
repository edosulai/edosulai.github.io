import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useRef, useState, useCallback } from 'react'
import siteContent from '@/data/site-content.json'
import resumeContent from '@/data/resume-content.json'

/* ═══ Chapter configuration ═══ */
const CHAPTERS = [
  { id: 'prologue', label: 'Prologue', accent: '#ffffff' },
  { id: 'origin', label: 'Origin', accent: '#d4a574' },
  { id: 'banking', label: 'Banking', accent: '#4a9eff' },
  { id: 'migration', label: 'Migration', accent: '#4ade80' },
  { id: 'architecture', label: 'Architecture', accent: '#818cf8' },
  { id: 'future', label: 'Agents', accent: '#c084fc' },
  { id: 'stack', label: 'Stack', accent: '#f472b6' },
  { id: 'contact', label: 'Contact', accent: '#fbbf24' },
]

const DYNAMIC_WORDS = [
  'Systems', 'Dreams', 'Transactions', 'Growth',
  'Contracts', 'Agents', 'Tools', 'Connections',
]

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  /* ── Load entrance ── */
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(t)
  }, [])

  /* ── Active chapter detection ── */
  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(Number.parseInt((entry.target as HTMLElement).dataset.chapter || '0', 10))
          }
        })
      },
      { root: main, threshold: 0.5 },
    )
    main.querySelectorAll('.chapter').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ── Scroll progress ── */
  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = main
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0)
    }
    main.addEventListener('scroll', onScroll, { passive: true })
    return () => main.removeEventListener('scroll', onScroll)
  }, [])

  /* ── GSAP reveal animations ── */
  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    let obs: IntersectionObserver | null = null
    import('gsap').then(({ gsap }) => {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('gsap-done')) {
              entry.target.classList.add('gsap-done')
              const reveals = entry.target.querySelectorAll('.reveal')
              if (reveals.length > 0) {
                gsap.fromTo(
                  reveals,
                  { y: 40, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
                )
              }
            }
          })
        },
        { root: main, threshold: 0.15 },
      )
      main.querySelectorAll('.chapter').forEach((el) => obs!.observe(el))
    })
    return () => obs?.disconnect()
  }, [])

  const scrollTo = useCallback((i: number) => {
    const main = mainRef.current
    if (!main) return
    const sections = main.querySelectorAll('.chapter')
    sections[i]?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const accent = CHAPTERS[activeChapter]?.accent || '#fff'
  const { hero, about, highlights, selectedWork, philosophy, contact, socialLinks } = siteContent
  const { experiences, coreSkills, techStack, education } = resumeContent

  return (
    <>
      <Head>
        <title>Edo Sulaiman — Full-stack engineer, banking systems, AI coding &amp; agents</title>
        <meta name="description" content={hero.subheadline} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* No-JS fallback */}
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: '.reveal{opacity:1!important;transform:none!important}' }} />
      </noscript>

      {/* Noise texture overlay */}
      <div className="noise" />

      {/* ═══ FIXED HEADER ═══ */}
      <header
        className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-10 py-3 sm:py-5 flex items-center justify-between transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <button onClick={() => scrollTo(0)} className="text-sm font-mono tracking-wider text-white/70 hover:text-white transition-colors py-3">
          {hero.name}
        </button>
        <span className="hidden md:flex items-center gap-1.5 text-sm font-mono tracking-wider text-white/40">
          Building{' '}
          <span key={activeChapter} className="inline-block animate-fade-in" style={{ color: accent }}>
            {DYNAMIC_WORDS[activeChapter]}
          </span>
        </span>
        <Link
          href="/resume"
          className="glass-clear px-4 py-3 text-xs font-mono tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          View CV →
        </Link>
      </header>

      {/* ═══ SIDE NAVIGATION ═══ */}
      <nav
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        {CHAPTERS.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => scrollTo(i)}
            className="group relative flex items-center justify-end gap-3"
            aria-label={`Go to ${ch.label}`}
          >
            <span
              className={`text-[10px] font-mono tracking-wider transition-all whitespace-nowrap ${
                activeChapter === i ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-70 text-white/50'
              }`}
            >
              {ch.label}
            </span>
            <span
              className={`rounded-full transition-all duration-300 ${
                activeChapter === i ? 'w-3 h-3' : 'w-1.5 h-1.5 hover:w-2 hover:h-2'
              }`}
              style={{ backgroundColor: activeChapter === i ? accent : 'rgba(255,255,255,0.3)' }}
            />
          </button>
        ))}
      </nav>

      {/* ═══ PROGRESS BAR ═══ */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] z-50 bg-white/5">
        <div className="h-full progress-bar" style={{ width: `${progress}%`, backgroundColor: accent }} />
      </div>

      {/* ═══ MAIN SCROLL CONTAINER ═══ */}
      <main ref={mainRef} className="scroll-container">

        {/* ──────────────────── PROLOGUE ──────────────────── */}
        <section className="chapter bg-prologue dot-grid" data-chapter="0">
          <div
            className={`text-center max-w-3xl mx-auto px-6 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="font-mono text-sm text-white/25 mb-8 tracking-[0.3em]">$ whoami</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 tracking-tight leading-[1.05]">
              {hero.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/55 mb-3 max-w-2xl mx-auto leading-relaxed">
              {hero.headline}
            </p>
            <p className="text-sm text-white/30 mb-14 max-w-xl mx-auto leading-relaxed">
              {hero.supportingLine}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollTo(1)}
                className="glass-frosted px-8 py-3 text-sm font-mono tracking-wider text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                Enter Portfolio
              </button>
              <Link
                href="/resume"
                className="glass-clear px-8 py-3 text-sm font-mono tracking-wider text-white/50 hover:text-white hover:bg-white/5 transition-all"
              >
                Download CV
              </Link>
            </div>
            <div className="mt-20 animate-bounce">
              <svg className="w-5 h-5 mx-auto text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* ──────────────────── CHAPTER 1: ORIGIN ──────────────────── */}
        <section className="chapter bg-origin" data-chapter="1">
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] animate-float" />
          <div className="absolute bottom-1/3 right-10 w-60 h-60 rounded-full bg-orange-500/[0.04] blur-[80px] animate-float-delayed" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-[180px_1fr] gap-4 sm:gap-8 md:gap-16 items-center">
            <div className="reveal flex items-baseline gap-3 md:block">
              <span className="font-serif text-5xl sm:text-7xl md:text-9xl text-amber-500/10 leading-none">01</span>
              <span className="font-mono text-xs tracking-widest text-amber-500/40 uppercase md:mt-2 md:block">Origin</span>
            </div>
            <div className="glass-frosted p-5 sm:p-8 md:p-12">
              <h2 className="reveal font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8 leading-snug">
                {about.sectionTitle}
              </h2>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="reveal text-white/55 leading-relaxed mb-5 last:mb-0 text-[15px]">
                  {p}
                </p>
              ))}
              <div className="reveal mt-8 flex flex-wrap gap-2">
                {highlights.map((h, i) => (
                  <span key={i} className="glass-clear px-3 py-1.5 text-xs font-mono text-amber-400/60">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────── CHAPTER 2: BANKING SYSTEMS ──────────────────── */}
        <section className="chapter bg-banking" data-chapter="2">
          <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-blue-500/[0.06] blur-[120px] animate-float" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-[180px_1fr] gap-4 sm:gap-8 md:gap-16 items-center">
            <div className="reveal flex items-baseline gap-3 md:block">
              <span className="font-serif text-5xl sm:text-7xl md:text-9xl text-blue-500/10 leading-none">02</span>
              <span className="font-mono text-xs tracking-widest text-blue-500/40 uppercase md:mt-2 md:block">Banking</span>
            </div>
            <div className="glass-frosted p-5 sm:p-8 md:p-12">
              <h2 className="reveal font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-2 leading-snug">
                {experiences[3].role}
              </h2>
              <p className="reveal font-mono text-xs text-blue-400/50 mb-1">{experiences[3].company}</p>
              <p className="reveal font-mono text-xs text-white/25 mb-6">{experiences[3].dates}</p>
              <p className="reveal text-white/55 leading-relaxed mb-6 text-[15px]">
                {selectedWork[0].description}
              </p>
              <ul className="space-y-3">
                {experiences[3].bullets.map((b, i) => (
                  <li key={i} className="reveal flex gap-3 text-sm text-white/45">
                    <span className="text-blue-400/40 mt-0.5 shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ──────────────────── CHAPTER 3: MIGRATION ──────────────────── */}
        <section className="chapter bg-migration" data-chapter="3">
          <div className="absolute bottom-1/4 left-10 w-72 h-72 rounded-full bg-green-500/[0.06] blur-[100px] animate-float-delayed" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-[180px_1fr] gap-4 sm:gap-8 md:gap-16 items-center">
            <div className="reveal flex items-baseline gap-3 md:block">
              <span className="font-serif text-5xl sm:text-7xl md:text-9xl text-green-500/10 leading-none">03</span>
              <span className="font-mono text-xs tracking-widest text-green-500/40 uppercase md:mt-2 md:block">Migration</span>
            </div>
            <div className="glass-frosted p-5 sm:p-8 md:p-12">
              <h2 className="reveal font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-2 leading-snug">
                {experiences[2].role}
              </h2>
              <p className="reveal font-mono text-xs text-green-400/50 mb-1">{experiences[2].company}</p>
              <p className="reveal font-mono text-xs text-white/25 mb-6">{experiences[2].dates}</p>
              <p className="reveal text-white/55 leading-relaxed mb-6 text-[15px]">
                {selectedWork[2].description}
              </p>
              <ul className="space-y-3">
                {experiences[2].bullets.map((b, i) => (
                  <li key={i} className="reveal flex gap-3 text-sm text-white/45">
                    <span className="text-green-400/40 mt-0.5 shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ──────────────────── CHAPTER 4: ARCHITECTURE ──────────────────── */}
        <section className="chapter bg-architecture" data-chapter="4">
          <div className="absolute top-1/4 right-20 w-80 h-80 rounded-full bg-indigo-500/[0.06] blur-[100px] animate-float" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-[180px_1fr] gap-4 sm:gap-8 md:gap-16 items-center">
            <div className="reveal flex items-baseline gap-3 md:block">
              <span className="font-serif text-5xl sm:text-7xl md:text-9xl text-indigo-500/10 leading-none">04</span>
              <span className="font-mono text-xs tracking-widest text-indigo-500/40 uppercase md:mt-2 md:block">Architecture</span>
            </div>
            <div className="glass-frosted p-5 sm:p-8 md:p-12">
              <h2 className="reveal font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-2 leading-snug">
                {experiences[0].role}
              </h2>
              <p className="reveal font-mono text-xs text-indigo-400/50 mb-1">{experiences[0].company}</p>
              <p className="reveal font-mono text-xs text-white/25 mb-6">{experiences[0].dates}</p>
              <p className="reveal text-white/55 leading-relaxed mb-6 text-[15px]">
                {selectedWork[1].description}
              </p>
              <ul className="space-y-3">
                {experiences[0].bullets.map((b, i) => (
                  <li key={i} className="reveal flex gap-3 text-sm text-white/45">
                    <span className="text-indigo-400/40 mt-0.5 shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="reveal font-mono text-xs text-indigo-400/30 mb-1">{experiences[1].company}</p>
                <p className="reveal font-mono text-xs text-white/20 mb-4">{experiences[1].dates}</p>
                <ul className="space-y-3">
                  {experiences[1].bullets.map((b, i) => (
                    <li key={i} className="reveal flex gap-3 text-sm text-white/40">
                      <span className="text-indigo-400/30 mt-0.5 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────── CHAPTER 5: AI AGENTS ──────────────────── */}
        <section className="chapter bg-future" data-chapter="5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/[0.04] blur-[150px]" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-[180px_1fr] gap-4 sm:gap-8 md:gap-16 items-center">
            <div className="reveal flex items-baseline gap-3 md:block">
              <span className="font-serif text-5xl sm:text-7xl md:text-9xl text-purple-500/10 leading-none">05</span>
              <span className="font-mono text-xs tracking-widest text-purple-500/40 uppercase md:mt-2 md:block">Agents</span>
            </div>
            <div className="glass-frosted p-5 sm:p-8 md:p-12">
              <h2 className="reveal font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-6 leading-snug">
                AI coding &amp; agent engineering
              </h2>
              <p className="reveal text-white/55 leading-relaxed mb-5 text-[15px]">
                {selectedWork[3].description}
              </p>
              {selectedWork[4] ? (
                <div className="reveal mb-5">
                  <p className="font-mono text-xs tracking-widest text-purple-400/50 uppercase mb-2">
                    {selectedWork[4].title}
                  </p>
                  <p className="text-white/55 leading-relaxed text-[15px]">
                    {selectedWork[4].description}
                  </p>
                </div>
              ) : null}
              <p className="reveal text-white/55 leading-relaxed mb-8 text-[15px]">
                {about.paragraphs[2]}
              </p>
              <div className="reveal glass-clear p-6">
                <p className="font-serif text-lg text-purple-300/70 italic leading-relaxed">
                  &ldquo;{philosophy.body}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────── CHAPTER 6: THE STACK ──────────────────── */}
        <section className="chapter bg-stack dot-grid" data-chapter="6">
          <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-pink-500/[0.06] blur-[100px] animate-float-delayed" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-[180px_1fr] gap-4 sm:gap-8 md:gap-16 items-start">
            <div className="reveal flex items-baseline gap-3 md:block md:sticky md:top-1/3">
              <span className="font-serif text-5xl sm:text-7xl md:text-9xl text-pink-500/10 leading-none">06</span>
              <span className="font-mono text-xs tracking-widest text-pink-500/40 uppercase md:mt-2 md:block">Stack</span>
            </div>
            <div className="glass-frosted p-5 sm:p-8 md:p-12">
              <h2 className="reveal font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8 leading-snug">
                Tools of the Trade
              </h2>

              {/* Education */}
              <div className="reveal mb-8 pb-8 border-b border-white/5">
                <h3 className="font-mono text-xs tracking-widest text-pink-400/40 uppercase mb-3">Education</h3>
                <p className="text-white/60 text-sm">{education.degree} — {education.major}</p>
                <p className="text-white/35 text-xs font-mono mt-1">{education.school} · {education.period} · GPA {education.gpa}</p>
              </div>

              {/* Core Skills */}
              <div className="reveal mb-8">
                <h3 className="font-mono text-xs tracking-widest text-pink-400/40 uppercase mb-4">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {coreSkills.map((skill, i) => (
                    <span key={i} className="glass-clear px-3 py-1.5 text-xs font-mono text-white/55">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack by category */}
              {Object.entries(techStack).map(([category, items]) => {
                const techItems = items.filter((item: string) => !/native speaker|working proficiency/i.test(item))
                const langItems = items.filter((item: string) => /native speaker|working proficiency/i.test(item))
                return (
                  <div key={category} className="reveal mb-6 last:mb-0">
                    <h3 className="font-mono text-xs tracking-widest text-pink-400/40 uppercase mb-3">{category}</h3>
                    <div className="space-y-1.5">
                      {techItems.map((item: string, i: number) => (
                        <p key={i} className="text-sm text-white/45 font-mono">{item}</p>
                      ))}
                    </div>
                    {langItems.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <h3 className="font-mono text-xs tracking-widest text-pink-400/40 uppercase mb-3">Languages</h3>
                        <div className="space-y-1.5">
                          {langItems.map((item: string, i: number) => (
                            <p key={i} className="text-sm text-white/45 font-mono">{item}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ──────────────────── CHAPTER 7: CONTACT ──────────────────── */}
        <section className="chapter bg-contact" data-chapter="7">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-amber-500/[0.06] blur-[120px] animate-float" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-10 w-full text-center">
            <div className="reveal">
              <span className="font-serif text-5xl sm:text-7xl md:text-9xl text-amber-500/10 block leading-none mb-4 sm:mb-6">07</span>
            </div>
            <h2 className="reveal font-serif text-2xl sm:text-3xl md:text-5xl text-white mb-6 sm:mb-8 leading-snug">
              {philosophy.sectionTitle}
            </h2>
            <p className="reveal text-white/45 leading-relaxed mb-12 max-w-2xl mx-auto text-[15px]">
              {contact.cta}
            </p>

            <div className="reveal flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/resume"
                className="glass-frosted px-8 py-4 text-sm font-mono tracking-wider text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                View Full CV →
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="glass-clear px-8 py-4 text-sm font-mono tracking-wider text-amber-400/60 hover:text-amber-300 hover:bg-amber-500/5 transition-all"
              >
                {contact.email}
              </a>
            </div>

            <div className="reveal flex flex-wrap justify-center gap-3">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-blur px-5 py-3 text-xs font-mono text-white/35 hover:text-white/70 hover:bg-white/5 transition-all"
                >
                  {link.title}
                </a>
              ))}
            </div>

            <p className="reveal mt-16 font-serif text-sm text-white/15 italic">
              I build systems for a future where software is powerful enough to disappear.
            </p>
          </div>
        </section>

      </main>
    </>
  )
}