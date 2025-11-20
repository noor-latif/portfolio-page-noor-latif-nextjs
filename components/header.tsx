"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || (theme === "system" 
      ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme)
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 " +
        (scrolled ? "glass-strong border-b border-nordic-accent/20" : "bg-transparent")
      }
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="#hero" className="font-mono font-bold text-nordic-accent hover:scale-110 focus:outline-none focus:ring-2 focus:ring-nordic-accent rounded transition-all duration-200">
          NL
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <a href="#hero" className="px-3 py-2 text-sm text-foreground/80 hover:text-nordic-accent hover:bg-nordic-accent/10 focus:outline-none focus:ring-2 focus:ring-nordic-accent rounded transition-all duration-200">Home</a>
          <a href="#skills" className="px-3 py-2 text-sm text-foreground/80 hover:text-nordic-accent hover:bg-nordic-accent/10 focus:outline-none focus:ring-2 focus:ring-nordic-accent rounded transition-all duration-200">Skills</a>
          <a href="#case-studies" className="px-3 py-2 text-sm text-foreground/80 hover:text-nordic-accent hover:bg-nordic-accent/10 focus:outline-none focus:ring-2 focus:ring-nordic-accent rounded transition-all duration-200">Case Studies</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={mounted && (resolvedTheme || theme) === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="h-9 w-9 text-foreground/80 hover:text-nordic-accent hover:bg-nordic-accent/10 focus:outline-none focus:ring-2 focus:ring-nordic-accent rounded"
          >
            {mounted && (resolvedTheme || theme) === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <div className="md:hidden">
            <Button asChild variant="outline" className="border-nordic-accent/50 text-nordic-accent">
              <a href="#case-studies">Jump to Work</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
