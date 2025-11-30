"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles, ArrowRight } from "lucide-react"
import { AIAssistantModal } from "@/components/ai-assistant-modal"

const fullText = "Transforming deployment chaos into one-click automation"

export function HeroSection() {
  const [showOverview, setShowOverview] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const scrollToSkills = () => {
    document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-primary/50 bg-card">
              <img
                src="/noor-professional-headshot.png"
                alt="Noor Latif professional headshot"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-mono">
              Noor Latif
            </h1>
          </div>

          {/* Tagline - Typing Effect */}
          <div className="h-16 md:h-12 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl font-mono text-secondary font-medium max-w-3xl">
              {text}
              <span className="animate-pulse border-r-2 border-secondary ml-1 h-6 inline-block align-middle" />
            </h2>
          </div>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
            DevOps Engineer specializing in IaC, Automation, & SRE
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="pt-8 flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              onClick={scrollToSkills}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-base px-8 py-6 h-auto rounded-md shadow-lg shadow-primary/20 transition-all duration-300 group border border-transparent"
            >
              <ArrowRight className="mr-2 w-5 h-5" />
              <span>View Skills</span>
            </Button>

            <Button
              onClick={() => setShowOverview(true)}
              size="lg"
              variant="outline"
              className="border-secondary/50 text-secondary hover:bg-secondary/10 font-mono text-base px-8 py-6 h-auto rounded-md group"
            >
              <Sparkles className="mr-2 w-5 h-5 group-hover:text-yellow-400 transition-colors" />
              <span>Ask AI</span>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground font-mono opacity-70">
            Scroll to see achievements or query AI assistant
          </p>
        </div>

        {/* AI Recruiter Overview Modal */}
        {showOverview && (
          <AIAssistantModal projectId={"overview"} onClose={() => setShowOverview(false)} />
        )}
      </div>
    </section>
  )
}
