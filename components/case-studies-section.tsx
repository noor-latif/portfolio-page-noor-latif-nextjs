"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIAssistantModal } from "@/components/ai-assistant-modal"
import { Sparkles, FolderOpen, ChevronRight } from "lucide-react"

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
    title: "Toyota Material Handling — IaC Framework",
    summary: "Framework that cut new system setup from weeks to minutes.",
    tags: ["IaC", "Docker", "SRE", "Linux SME"],
  },
  {
    id: "aqua-robur",
    metric: "60% Efficiency / 30% Energy Gain",
    title: "Aqua Robur Technologies — Automation & Firmware",
    summary: "Automated provisioning boosting efficiency and optimizing turbine firmware.",
    tags: ["Python Automation", "Embedded C/C++", "IoT", "OPC-UA"],
  },
  {
    id: "goteborgs-sparvagor",
    metric: "Critical Infra Maintained",
    title: "Göteborgs Spårvägar — Tram Network Infrastructure",
    summary: "Maintained critical IT infra (datacenter, PLCs) and scripted automatic firmware provisioning.",
    tags: ["Networking", "Linux/PLCs", "Scripting", "System Support"],
  },
]

export function CaseStudiesSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <section id="case-studies" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-mono">
            Case Studies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            Real-world projects with measurable results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Card
              key={study.id}
              className="terminal-card flex flex-col group border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader>
                {/* Prominent Metric */}
                <div className="mb-4 p-4 rounded bg-primary/5 border border-primary/10 group-hover:border-primary/30 transition-colors">
                  <p className="text-2xl font-mono font-bold text-primary leading-tight">
                    {study.metric}
                  </p>
                </div>

                <CardTitle className="text-xl font-semibold leading-snug font-mono group-hover:text-primary transition-colors">
                  {study.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed font-mono">
                  {study.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 mt-auto">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-mono border-secondary/30 text-secondary hover:bg-secondary/10 rounded-none">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* AI Assistant Button */}
                <Button
                  onClick={() => setSelectedProject(study.id)}
                  variant="outline"
                  className="w-full border-primary/50 text-primary hover:bg-primary/10 font-mono transition-all group/btn rounded-md"
                >
                  <Sparkles className="w-4 h-4 mr-2 group-hover/btn:text-yellow-400 transition-colors" />
                  <span>Analyze with AI</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity" />
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
