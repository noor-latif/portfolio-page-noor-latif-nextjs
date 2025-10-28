"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"
import { AIAssistantModal } from "@/components/ai-assistant-modal"

export function HeroSection() {
  const [showOverview, setShowOverview] = useState(false)
  const scrollToSkills = () => {
    document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-[#00FFFF] shadow-lg shadow-[#00FFFF]/20">
            <img
              src="/noor-professional-headshot.png"
              alt="Noor Latif professional headshot"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">Noor Latif</h1>

        {/* Tagline - Monospace */}
        <h2 className="text-2xl md:text-3xl font-mono text-[#00FFFF] font-semibold">
          Transforming deployment chaos into one-click automation
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          DevOps Engineer specializing in Infrastructure as Code, CI/CD Automation, and Site Reliability Engineering
        </p>

        {/* CTA Buttons */}
        <div className="pt-8 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={scrollToSkills}
              size="lg"
              className="bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90 font-semibold text-lg px-10 py-7 rounded-lg shadow-lg shadow-[#00FFFF]/30 hover:shadow-[#00FFFF]/50 transition-all duration-300 animate-pulse hover:animate-none group"
            >
              <span>Explore Impact & Results</span>
              <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              onClick={() => setShowOverview(true)}
              size="lg"
              variant="outline"
              className="border-[#00FFFF]/60 text-[#00FFFF] hover:bg-[#00FFFF]/10 font-semibold text-lg px-10 py-7 rounded-lg"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Ask AI about my fit
            </Button>
          </div>
          <p className="text-xs text-muted-foreground font-mono">Scroll to see quantifiable achievements or ask AI for a quick recruiter overview</p>
        </div>

        {/* AI Recruiter Overview Modal */}
        {showOverview && (
          <AIAssistantModal projectId={"overview"} onClose={() => setShowOverview(false)} />
        )}
      </div>
    </section>
  )
}
