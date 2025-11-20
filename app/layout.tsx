import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter, Fira_Code, Tomorrow } from "next/font/google"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" })
const tomorrow = Tomorrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tomorrow",
})

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('portfolio-theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = theme === 'dark' || (theme === 'system' && systemPrefersDark) || (!theme && systemPrefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${tomorrow.variable} ${firaCode.variable} font-sans antialiased`}>
        <ThemeProvider>
          {/* Skip link for accessibility */}
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-nordic-accent focus:text-white focus:px-3 focus:py-2 focus:rounded">
            Skip to content
          </a>
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
