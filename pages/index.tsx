import { SocialLink } from '@/components';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useMemo } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const socialLinks = useMemo(() => [
    {
      href: "https://instagram.com/edosulai",
      title: "Instagram",
      username: "@edosulai"
    },
    {
      href: "https://linkedin.com/in/edosulaiman",
      title: "Linkedin",
      username: "linkedin.com/in/edosulaiman"
    },
    {
      href: "https://github.com/edosulai",
      title: "Github",
      username: "github.com/edosulai"
    },
    {
      href: "mailto:edosulai@icloud.com",
      title: "Email",
      username: "edosulai@icloud.com"
    }
  ], []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get my Resume by click&nbsp;
          <Link href={`/resume`}>
            <code className="font-mono font-bold">This.resume()</code>
          </Link>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          Hi😁, I&apos;m Edo Sulaiman
        </div>
      </div>

      <div className="
      relative flex place-items-center 

      before:absolute 
      before:-z-50
      before:h-[180px] 
      before:w-[300px] 
      before:-top-10
      before:-left-20
      before:bg-gradient-to-br 
      before:rounded-full 
      before:blur-2xl
      before:content-[''] 
      before:from-[#FF0000]/40
      before:to-[#66B3FF]/40
      before:animate-[blob_7s_infinite]
      before:[animation-delay:_0s]

      after:absolute
      after:-z-50
      after:h-[180px] 
      after:w-[300px] 
      after:-right-20
      after:-bottom-10
      after:bg-gradient-to-tl 
      after:rounded-full
      after:blur-2xl
      after:content-['']
      after:to-[#66B3FF]/40
      after:from-[#9CCC65]/40
      after:animate-[blob_7s_infinite]
      after:[animation-delay:_2s]

      ">
        <div className="relative drop-shadow-[0_0_0.3rem_#00000070] dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-center">
          <div className="relative ">
            <h1 className="relative text-9xl -tracking-[0.75rem] font-sans font-bold [text-shadow:_-8px_0_0_#ADD8E6] dark:[text-shadow:_-8px_0_0_#66B3FF]">
              <span>5</span>
              <span>0</span>
              <span>3</span>
            </h1>
            <span className="absolute top-0 -ml-12  font-semibold">Oops!</span>
          </div>
          <h5 className=" font-semibold -mr-10 -mt-3">Service Unavailable</h5>
          <p className=" mt-2 mb-6">Forgive me, but the website is still under development by me 😭</p>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {socialLinks.map((link, index) => (
          <SocialLink
            key={index}
            href={link.href}
            title={link.title}
            username={link.username}
          />
        ))}
      </div>
    </main>
  )
}