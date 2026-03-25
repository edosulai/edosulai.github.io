import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
