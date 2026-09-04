import fs from 'node:fs'
import path from 'node:path'

import Head from 'next/head'
import Link from 'next/link'
import { useCallback } from 'react'

interface ResumeProps {
  cvStyles: string
  cvBody: string
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'resume.html')
  const html = fs.readFileSync(filePath, 'utf-8')

  const styleMatch = /<style>([\s\S]*?)<\/style>/.exec(html)
  const bodyMatch = /<body>([\s\S]*?)<\/body>/.exec(html)

  let cvStyles = styleMatch?.[1] || ''

  // Remove global reset & body styles — Tailwind base handles these,
  // and we use a wrapper div for the dark background + centering
  cvStyles = cvStyles.replace(
    /\/\* ===== RESET & BASE ===== \*\/[\s\S]*?(?=\/\* ===== CV CONTAINER)/,
    ''
  )

  return {
    props: {
      cvStyles,
      cvBody: bodyMatch?.[1] || '',
    },
  }
}

export default function Resume({ cvStyles, cvBody }: Readonly<ResumeProps>) {
  const handleDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Edo_Sulaiman_CV.pdf'
    link.click()
  }, [])

  return (
    <>
      <Head>
        <title>Resume - Edo Sulaiman | Full-Stack Engineer</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content="Full-stack engineer. Banking and finance systems in Go, React, and Android. AI coding agents and agent engineering."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo:wght@600;700&family=Cabin:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Metrophobic&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </Head>

      {/* CV styles + print overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            ${cvStyles}

            html, body {
              overflow: auto !important;
              height: auto !important;
            }

            @media print {
              @page { margin: 0; }
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                background: none !important;
              }
              .cv-page-wrapper {
                background: none !important;
                padding: 0 !important;
                min-height: auto !important;
                overflow: visible !important;
              }
            }
          `,
        }}
      />

      {/* Back to Home — hidden when printing */}
      <div className="print:hidden fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Home
        </Link>
      </div>

      {/* Download PDF — hidden when printing */}
      <div className="print:hidden fixed top-6 right-6 z-50">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#408040]/80 backdrop-blur-md rounded-full border border-[#408040]/30 hover:bg-[#408040] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download PDF
        </button>
      </div>

      {/* CV Content */}
      <div
        className="cv-page-wrapper flex justify-center min-h-screen py-10"
        style={{ background: 'rgba(30, 30, 30, 1)' }}
        dangerouslySetInnerHTML={{ __html: cvBody }}
      />
    </>
  )
}