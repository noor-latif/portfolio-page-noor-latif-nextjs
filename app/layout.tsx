import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter, Fira_Code } from 'next/font/google'
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" })

export const metadata: Metadata = {
  title: "Noor Latif | DevOps Engineer Portfolio",
  description: "Junior DevOps Engineer specializing in IaC, Automation, and AI-driven Reliability",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        {/* Skip link for accessibility */}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-[#00FFFF] focus:text-black focus:px-3 focus:py-2 focus:rounded">
          Skip to content
        </a>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
