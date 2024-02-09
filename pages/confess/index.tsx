import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Confess() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
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
              <span>❤️</span>
            </h1>
            <span className="absolute top-0 -ml-12 font-semibold">Adele...</span>
          </div>
          <h5 className="font-semibold text-3xl mt-5">Lu mau nggak jadi pacar gw ?</h5>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        <a
          href="https://wa.me/6282386007722?text=YES"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            YES{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Pliss yg ini...
          </p>
        </a>

        <a
          href="https://wa.me/6282386007722?text=NO"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            NO{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            🥲🥲🥲
          </p>
        </a>
      </div>
    </main>
  )
}
