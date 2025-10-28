"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 " +
        (scrolled ? "glass-strong border-b border-[#00FFFF]/20" : "bg-transparent")
      }
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="#hero" className="font-mono font-bold text-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] rounded">
          NL
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <a href="#hero" className="px-3 py-2 text-sm text-foreground/80 hover:text-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] rounded">Home</a>
          <a href="#skills" className="px-3 py-2 text-sm text-foreground/80 hover:text-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] rounded">Skills</a>
          <a href="#case-studies" className="px-3 py-2 text-sm text-foreground/80 hover:text-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] rounded">Case Studies</a>
        </nav>
        <div className="md:hidden">
          <Button asChild variant="outline" className="border-[#00FFFF]/50 text-[#00FFFF]">
            <a href="#case-studies">Jump to Work</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
