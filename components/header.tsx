"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Code2 } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b " +
        (scrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
          : "bg-transparent border-transparent")
      }
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="#hero"
          className="group flex items-center gap-2 font-mono font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <Code2 className="w-5 h-5" />
          <span>Noor Latif</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
          <a
            href="#skills"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Skills
          </a>
          <a
            href="#case-studies"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Case Studies
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={mounted && (resolvedTheme || theme) === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
          >
            {mounted && (resolvedTheme || theme) === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <div className="md:hidden">
            <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-mono text-xs">
              <a href="#case-studies">Case Studies</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
