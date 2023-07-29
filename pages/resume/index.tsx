import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isBrowser } from 'react-device-detect'

import fs from 'fs'
import path from 'path'

interface ResumeProps {
  buffer: string;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'Edo Sulaiman - Full-Stack Developer.pdf')
  const fileData = fs.readFileSync(filePath)

  return {
    props: {
      buffer: Buffer.from(fileData).toString('base64')
    }
  }
}

const inter = Inter({ subsets: ['latin'] })

export default function Resume({ buffer }: ResumeProps) {
  const router = useRouter()

  if (!isBrowser) {
    const link = document.createElement('a')
    link.href = `data:application/pdf;base64,${buffer}`
    link.setAttribute('download', 'Edo Sulaiman - Full-Stack Developer.pdf')
    link.click()

    router.push('/')
  }

  useEffect(() => {
    document.body.className = 'overflow-hidden'

    return () => {
      document.body.className = document.body.className.replace('overflow-hidden', '')
    }
  }, [])

  return (
    <main className={`flex flex-col items-center justify-between ${inter.className}`}>
      <div className="z-10 w-full items-center justify-between font-mono text-sm">
        <Link
          href={`/Edo Sulaiman - Full-Stack Developer.pdf`}
          className="fixed -right-10 -top-10 flex w-20 h-20 rounded-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-600 dark:bg-zinc-600 dark:from-inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative -bottom-11 -left-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </span>
        </Link>

        <button
          onClick={() => router.push('/')}
          className="fixed -left-10 -top-10 flex w-20 h-20 rounded-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-600 dark:bg-zinc-600 dark:from-inherit"
        >
          <span className="relative -bottom-11 -right-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </span>
        </button>
      </div>
      <span className='h-12 flex items-center'>Last Updated July 29, 2023</span>
      <div className="flex justify-center w-full h-screen overflow-hidden">
        <iframe className="w-full h-screen" src={`data:application/pdf;base64,${buffer}`} />
      </div>
    </main>
  )
}