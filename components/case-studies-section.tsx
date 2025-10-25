"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIAssistantModal } from "@/components/ai-assistant-modal"
import { Sparkles } from "lucide-react"

interface CaseStudy {
  id: string
  metric: string
  title: string
  summary: string
  tags: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: "toyota",
    metric: "5-10 Min Deployment",
    title: "Toyota IaC: Weeks to Minutes",
    summary: "Framework that cut new system setup from weeks to minutes.",
    tags: ["IaC", "Docker", "SRE", "Linux SME"],
  },
  {
    id: "aqua-robur",
    metric: "60% Efficiency / 30% Energy Gain",
    title: "Aqua Robur: Automation & Firmware Optimization",
    summary: "Automated provisioning boosting efficiency and optimizing turbine firmware.",
    tags: ["Python Automation", "Embedded C/C++", "IoT", "OPC-UA"],
  },
  {
    id: "goteborgs-sparvagor",
    metric: "Critical Infra Maintained",
    title: "Tram Network Infra & Scripted Provisioning",
    summary: "Maintained critical IT infra (datacenter, PLCs) and scripted automatic firmware provisioning.",
    tags: ["Networking", "Linux/PLCs", "Scripting", "System Support"],
  },
]

export function CaseStudiesSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <section id="case-studies" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Quantifiable Impact & Case Studies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world projects with measurable results across automation, IoT, and infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Card
              key={study.id}
              className="glass-strong border-[#00FFFF]/30 hover:border-[#00FFFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/20 flex flex-col"
            >
              <CardHeader>
                {/* Prominent Metric */}
                <div className="mb-4 p-4 rounded-lg bg-[#00FFFF]/10 border border-[#00FFFF]/30">
                  <p className="text-3xl font-mono font-bold text-[#00FFFF] text-center leading-tight">
                    {study.metric}
                  </p>
                </div>

                <CardTitle className="text-xl font-semibold leading-snug">{study.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{study.summary}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 mt-auto">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-[#00FFFF]/50 text-[#00FFFF]">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* AI Assistant Button */}
                <Button
                  onClick={() => setSelectedProject(study.id)}
                  className="w-full bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90 font-semibold transition-all group"
                >
                  <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Deep Dive with AI
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal projectId={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
