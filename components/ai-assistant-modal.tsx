"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import ReactMarkdown from "react-markdown"
import { Send, Sparkles } from "lucide-react"

interface AIAssistantModalProps {
  projectId: string | null
  onClose: () => void
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; message?: string }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[AI Modal] Markdown render error:", error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-3 rounded border border-destructive/30 bg-destructive/10 text-xs text-destructive">
          Failed to render response.
        </div>
      )
    }
    return this.props.children
  }
}

const projectQuestions: Record<string, string[]> = {
  toyota: [
    "What specific IaC tools were used?",
    "How did this improve team productivity?",
    "What were the main technical challenges?",
  ],
  "aqua-robur": [
    "How was the 60% efficiency gain measured?",
    "What firmware optimizations were made?",
    "How does OPC-UA fit into the architecture?",
  ],
  "goteborgs-sparvagor": [
    "What critical systems were maintained?",
    "How was firmware provisioning automated?",
    "What was the scale of the infrastructure?",
  ],
}

const projectTitles: Record<string, { title: string; description: string }> = {
  toyota: {
    title: "Toyota IaC Framework Deep Dive",
    description: "Exploring the infrastructure automation that reduced deployment time by 95%",
  },
  "aqua-robur": {
    title: "Aqua Robur IoT Innovation Deep Dive",
    description: "Analyzing the automation and firmware optimizations that transformed production efficiency",
  },
  "goteborgs-sparvagor": {
    title: "Tram Network Infrastructure Deep Dive",
    description: "Examining the critical systems and automation behind Gothenburg's public transport",
  },
}

const projectContexts: Record<string, string> = {
  toyota: `# Toyota Material Handling - System Support Engineer

**Duration:** February 2023 - Present (2 years 9 months)

## Key Achievements

### Infrastructure as Code Framework
- Built infrastructure-as-code framework and deployment application
- Reduced system setup from weeks to 5-10 minutes
- Enabled engineers to spin up complete test environments on laptops with one-click simplicity
- Focused on automated warehouse systems and fork-lift automation technology

### Technical Contributions
- Optimized Docker orchestration and bash scripts
- Improved system reliability and reduced deployment friction
- Served as Linux subject matter expert
- Provided technical support across both Linux and Windows server environments

### Documentation & Knowledge Transfer
- Created comprehensive technical documentation
- Developed training materials for engineering teams
- Managed full project lifecycle including requirements gathering, estimation, development, and delivery

## Technical Stack
- Infrastructure as Code (IaC)
- Docker/Kubernetes
- Linux/Windows Server Administration
- Bash Scripting
- CI/CD Pipelines`,

  "aqua-robur": `# Aqua Robur Technologies - Hardware and Software Developer

**Duration:** February 2021 - September 2022 (1 year 8 months)

**Company Recognition:** Featured on '33-listan' for Sweden's best startups in innovation and growth

## Key Achievements

### OPC-UA Infrastructure Management
- Managed OPC-UA server infrastructure
- Connected client SCADA/HMI systems
- Automated device connections via KepServerEX API

### Python Automation
- Automated device configuration processes with Python
- Increased production efficiency by 60%
- Eliminated manual errors in provisioning

### Embedded Systems Development
- Developed portable sensor-tester with built-in display
- Stress tested and troubleshooted level sensors during manufacturing
- Optimized turbine energy harvester firmware in embedded C/C++
- Achieved 30% improvement in energy efficiency

### Security & Mentorship
- Developed certificate upgrade processes for industrial systems
- Strengthened security protocols
- Mentored Chalmers' master's thesis students on sensor development and IoT engineering practices

## Technical Stack
- OPC-UA / KepServerEX
- Python (Automation & API Development)
- Embedded C/C++
- Industrial IoT
- SCADA/HMI Systems`,

  "goteborgs-sparvagor": `# Göteborgs Spårvägar AB - Technician & Programmer

**Duration:** September 2022 - February 2023 (6 months)

## Overview
Maintained and configured IT infrastructure for Gothenburg's tram network, working with vehicle computers, surveillance systems, and industrial control systems.

## Key Responsibilities

### Critical Infrastructure Maintenance
- Serviced IT datacenter for Västtrafik traffic control center (Trafikledningscentral)
- Maintained vehicle computers and network equipment
- Managed video surveillance systems
- Worked with internal PLCs (Programmable Logic Controllers)

### Automation & Scripting
- Scripted automatic provisioning of firmware for live travel displays on-board trams
- Automated deployment processes for critical transport infrastructure

### Industrial IoT Experience
- Worked hands-on with Industrial IoT systems in live operational transport environment
- Ensured reliability and uptime of critical public transportation systems

## Technical Stack
- Linux/Windows Server Administration
- PLC Programming & Configuration
- Network Equipment Configuration
- Scripting (Bash/Python)
- Industrial IoT Systems
- Video Surveillance Systems`,
}

export function AIAssistantModal({ projectId, onClose }: AIAssistantModalProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [response, setResponse] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customQuestion, setCustomQuestion] = useState<string>("")

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setResponse("") // reset when project changes
    setSelectedQuestion(null)
    setError(null)
    setCustomQuestion("")
  }, [projectId])
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleQuestionClick = async (question: string) => {
    setSelectedQuestion(question)
    setResponse("")
    setError(null)
    setIsLoading(true)

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          question,
          context: projectContexts[projectId || ""] || "",
        }),
      })

      if (!res.ok) {
        if (res.status === 429) {
          setError("Rate limit exceeded. Please try again later.")
        } else {
          setError("Failed to get response from AI assistant.")
        }
        setIsLoading(false)
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        setError("Failed to read response stream.")
        setIsLoading(false)
        return
      }

      let accumulatedResponse = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        accumulatedResponse += chunk
        setResponse(accumulatedResponse)
      }

      setIsLoading(false)
    } catch {
      setError("An error occurred while fetching the response.")
      setIsLoading(false)
    }
  }

  const handleCustomQuestion = async () => {
    if (!customQuestion.trim()) return
    await handleQuestionClick(customQuestion)
    setCustomQuestion("")
  }

  if (!projectId) return null

  const questions = projectQuestions[projectId] || []
  const context = projectContexts[projectId] || ""
  const projectInfo = projectTitles[projectId] || {
    title: "Project Deep Dive",
    description: "AI-powered analysis of technical achievements and implementation details",
  }

  return (
    <Dialog open={!!projectId} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] sm:max-w-[95vw] lg:max-w-[1500px] max-h-[95vh] overflow-hidden p-0 bg-background/95 backdrop-blur-xl border-[#00FFFF]/20">
        <DialogHeader className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-5 lg:pb-6 border-b border-[#00FFFF]/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#00FFFF] flex-shrink-0" />
            <DialogTitle className="text-lg sm:text-2xl lg:text-3xl font-mono font-bold text-[#00FFFF] tracking-tight leading-tight text-balance">
              {projectInfo.title}
            </DialogTitle>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
            {projectInfo.description}
          </p>
        </DialogHeader>

        <div className="flex flex-col lg:grid lg:grid-cols-[42%_58%] gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(95vh-140px)] custom-scrollbar">
          <div className="space-y-4 sm:space-y-5 lg:order-2">
            <Card className="glass-strong border-[#00FFFF]/20 shadow-lg shadow-[#00FFFF]/5">
              <CardHeader className="pb-4 sm:pb-5 border-b border-[#00FFFF]/10">
                <CardTitle className="text-base sm:text-lg font-mono font-semibold text-[#00FFFF]/90">
                  AI Assistant
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Powered by Gemini & Next.js</p>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm font-medium text-foreground/80 mb-3 sm:mb-4">Suggested Questions:</p>
                  {questions.map((question) => (
                    <Button
                      key={question}
                      onClick={() => handleQuestionClick(question)}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3 sm:py-4 px-4 sm:px-6 
                        border-[#00FFFF]/20 hover:bg-[#00FFFF]/5 hover:border-[#00FFFF]/60 
                        transition-all duration-200 text-xs sm:text-sm font-medium
                        shadow-sm hover:shadow-md hover:shadow-[#00FFFF]/10
                        whitespace-normal break-words leading-relaxed"
                      disabled={isLoading}
                    >
                      {question}
                    </Button>
                  ))}
                </div>

                <Separator className="bg-[#00FFFF]/10" />

                <div
                  className="min-h-[240px] sm:min-h-[320px] max-h-[400px] sm:max-h-[520px] overflow-y-auto rounded-xl bg-background/40 backdrop-blur-sm p-4 sm:p-7 border border-[#00FFFF]/10 custom-scrollbar"
                  role="region"
                  aria-live="polite"
                  aria-busy={isLoading}
                >
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3 sm:gap-4">
                      <Spinner className="w-8 h-8 sm:w-10 sm:h-10 text-[#00FFFF]" />
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        Analyzing project details...
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 sm:p-5 rounded-lg bg-destructive/10 border border-destructive/30">
                      <p className="text-destructive text-xs sm:text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {response && !isLoading && (
                    <ErrorBoundary>
                      <div
                        className="prose prose-invert prose-sm max-w-none text-xs sm:text-sm leading-relaxed break-words
                        [&>p]:mb-4 sm:[&>p]:mb-5 [&>p]:text-foreground/90 [&>p]:leading-relaxed
                        [&>ul]:mb-4 sm:[&>ul]:mb-5 [&>ul]:space-y-2 [&>ul>li]:text-foreground/90
                        [&>ol]:mb-4 sm:[&>ol]:mb-5 [&>ol]:space-y-2 [&>ol>li]:text-foreground/90
                        [&>h1]:mb-3 sm:[&>h1]:mb-4 [&>h1]:text-[#00FFFF] [&>h1]:font-semibold [&>h1]:text-base sm:[&>h1]:text-lg
                        [&>h2]:mb-3 sm:[&>h2]:mb-4 [&>h2]:text-[#00FFFF]/90 [&>h2]:font-semibold [&>h2]:text-sm sm:[&>h2]:text-base
                        [&>h3]:mb-2 sm:[&>h3]:mb-3 [&>h3]:text-foreground [&>h3]:font-semibold [&>h3]:text-sm
                        [&>strong]:text-[#00FFFF]/80 [&>strong]:font-semibold
                        [&>code]:text-[#00FFFF] [&>code]:bg-[#00FFFF]/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs"
                      >
                        <ReactMarkdown>{response}</ReactMarkdown>
                      </div>
                    </ErrorBoundary>
                  )}

                  {!selectedQuestion && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-2 sm:gap-3">
                      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#00FFFF]/30" />
                      <p className="text-muted-foreground text-xs sm:text-sm text-center font-medium px-4">
                        Select a question above to get AI-powered insights
                      </p>
                    </div>
                  )}
                </div>

                {response && !isLoading && (
                  <div className="space-y-2 sm:space-y-3 pt-2">
                    <p className="text-xs sm:text-sm font-medium text-foreground/80">Ask a follow-up question:</p>
                    <div className="flex gap-2 sm:gap-3">
                      <Input
                        value={customQuestion}
                        onChange={(e) => setCustomQuestion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleCustomQuestion()
                          }
                        }}
                        placeholder="Type your question here..."
                        className="flex-1 bg-background/60 border-[#00FFFF]/20 focus:border-[#00FFFF]/60 transition-colors h-10 sm:h-11 text-xs sm:text-sm"
                        disabled={isLoading}
                      />
                      <Button
                        onClick={handleCustomQuestion}
                        disabled={isLoading || !customQuestion.trim()}
                        className="bg-[#00FFFF]/10 hover:bg-[#00FFFF]/20 border border-[#00FFFF]/30 hover:border-[#00FFFF]/60 text-[#00FFFF] h-10 sm:h-11 px-4 sm:px-5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 lg:order-1">
            <Card className="glass-strong border-[#00FFFF]/20 shadow-lg shadow-[#00FFFF]/5">
              <CardHeader className="pb-5 border-b border-[#00FFFF]/10">
                <CardTitle className="text-lg font-semibold text-[#00FFFF]/90">Project Context</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div
                  className="prose prose-invert prose-sm max-w-none 
                  [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-5 [&>h1]:text-[#00FFFF] [&>h1]:leading-tight
                  [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:mt-7 [&>h2]:text-[#00FFFF]/90 [&>h2]:leading-snug
                  [&>h3]:text-base [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-5 [&>h3]:text-foreground
                  [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-muted-foreground
                  [&>ul]:mb-5 [&>ul]:space-y-2 [&>ul>li]:leading-relaxed [&>ul>li]:text-muted-foreground
                  [&>strong]:text-[#00FFFF]/70 [&>strong]:font-semibold"
                >
                  <ReactMarkdown>{context}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
