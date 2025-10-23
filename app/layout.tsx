import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { InstallPrompt } from "@/components/install-prompt"
import { Suspense } from "react"

import { Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#00FFFF",
}

export const metadata: Metadata = {
  title: "EasyCustomized - India's Reverse Marketplace",
  description: "Your idea, their craft. Connect with skilled artisans and craftspeople across India.",
  generator: "v0.app",
  manifest: "/manifest.json",
  applicationName: "EasyCustomized",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EasyCustomized",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icons/icon-192x192.png",
  },
  openGraph: {
    type: "website",
    siteName: "EasyCustomized",
    title: "EasyCustomized - India's Reverse Marketplace",
    description: "Your idea, their craft. Connect with skilled artisans and craftspeople across India.",
  },
  twitter: {
    card: "summary",
    title: "EasyCustomized",
    description: "Your idea, their craft.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-serif ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#00FFFF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#00FFFF]">Loading EasyCustomized...</p>
            </div>
          </div>
        }>
          <SiteHeader />
          {children}
          <InstallPrompt />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
