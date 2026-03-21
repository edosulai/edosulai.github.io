import { SocialLink } from '@/components';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const socialLinks = [
    {
      href: "https://instagram.com/edosulai",
      title: "Instagram",
      username: "@edosulai"
    },
    {
      href: "https://linkedin.com/in/edosulaiman",
      title: "LinkedIn",
      username: "linkedin.com/in/edosulaiman"
    },
    {
      href: "https://github.com/edosulai",
      title: "GitHub",
      username: "github.com/edosulai"
    },
    {
      href: "mailto:edosulai@icloud.com",
      title: "Email",
      username: "edosulai@icloud.com"
    }
  ];

  const highlights = [
    '3+ years of professional experience',
    '4,300+ commits',
    '80+ repositories contributed to',
    'Banking, finance, and AI-first systems'
  ];

  const focusAreas = [
    'Banking-grade systems',
    'Distributed contracts',
    'Backend-heavy integration',
    'Architecture alignment',
    'AI-first operations'
  ];

  const selectedWork = [
    {
      title: 'QLola / QCash',
      description: 'Built and optimized banking-grade cash-management systems across frontend and backend layers, including payroll transfer, mass transfer workflows, secure file handling, and service-contract communication.'
    },
    {
      title: 'BRiSpot / BNS',
      description: 'Contributed to contract and integration alignment across a multi-repository ecosystem through protobuf standardization, centralized endpoint patterns, and shared event-contract thinking.'
    },
    {
      title: 'Kreditplus',
      description: 'Worked on migration-oriented backend engineering with a focus on compatibility, observability, and service refinement in finance-domain systems.'
    },
    {
      title: 'Pinturakik / Momena',
      description: 'Developing internal tools and platform capabilities to streamline operations, improve team productivity, and support scalable product delivery.'
    }
  ];

  return (
    <main className={`min-h-screen bg-[#f5f0e8] text-slate-900 ${inter.className}`}>
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(118,162,123,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(99,149,226,0.16),_transparent_26%),linear-gradient(135deg,_rgba(255,255,255,0.72),_rgba(245,240,232,0.96))]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-14 pt-8 lg:px-10 lg:pb-20 lg:pt-10">
          <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Edo Sulaiman</p>
              <p className="mt-2 max-w-xl text-sm text-slate-600">Full-stack engineer building banking-grade and AI-first systems through backend-heavy integration, distributed contracts, and architecture alignment.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link href="/resume" className="rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white">
                View Resume
              </Link>
              <a href="mailto:edosulai@icloud.com" className="rounded-full border border-transparent px-2 py-2 text-slate-600 transition hover:text-slate-900">
                edosulai@icloud.com
              </a>
            </div>
          </div>

          <div className="grid flex-1 gap-10 py-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:py-16">
            <div>
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-[#567b5a]">Banking-grade systems. AI-first operations.</p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-900 sm:text-6xl lg:text-7xl">
                Building systems that become reliable enough to disappear.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-700">
                From secure transfer workflows to AI-first operating systems, I work at the intersection of implementation, integration, and architecture alignment across finance and complex service environments.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {focusAreas.map((item) => (
                  <span key={item} className="rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-sm text-slate-700 backdrop-blur">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Snapshot</p>
              <div className="grid gap-3">
                {highlights.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-700 ring-1 ring-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">About</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-900">From the edges of technology into systems that carry real weight.</h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-slate-700">
            <p>
              My path into technology started far from the usual centers of access and advantage. What stayed constant was the habit of learning from the edges, then turning that persistence into work on banking-grade systems, finance-domain services, and architecture shaped by contracts, integration clarity, and system alignment.
            </p>
            <p>
              Today, I work across backend-heavy systems, microservices, and distributed contracts. I am most interested in the point where implementation grows into architecture, and where software becomes reliable enough to fade into the background.
            </p>
            <p>
              My long-term direction is AI-first systems: not AI as a side feature, but AI as an operational layer that reduces friction, preserves continuity, and moves routine execution away from humans.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Selected Work</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-slate-900">Work shaped by transaction-heavy systems, service contracts, and long-horizon operating models.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              The through-line is consistent: clearer boundaries, stronger contracts, quieter systems, and better operational reliability.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {selectedWork.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-[#f8f4ed] p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Philosophy</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-900">The best systems stop asking for attention.</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-700">
              I care less about flashy software and more about systems that become trustworthy, calm, and almost invisible. The best technology does not demand constant attention. It carries complexity quietly.
            </p>
          </div>

          <div>
            <div className="grid text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">
              {socialLinks.map((link, index) => (
                <SocialLink
                  key={index}
                  href={link.href}
                  title={link.title}
                  username={link.username}
                />
              ))}
            </div>
            <div className="mt-8 rounded-[1.75rem] bg-slate-900 px-6 py-7 text-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Contact</p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
                If you are building complex systems in finance, infrastructure, or AI-first operations, I am interested in problems where implementation, architecture, and long-term system clarity have to meet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}