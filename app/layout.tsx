import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import ScrollToTop from "../components/ScrollToTop"
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ANIVERSE",
  description: "Anime Discovery Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >

      <body className="bg-black text-white overflow-x-hidden min-h-screen">

      <ScrollToTop />
        {children}
        <Toaster richColors position="top-center" />

      </body>

    </html>

  )
}