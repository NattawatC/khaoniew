import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Kanit } from "next/font/google"

const kanit = Kanit({ weight: "400", subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${kanit.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
