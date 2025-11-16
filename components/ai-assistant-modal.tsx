"use client"

import React, { useState, useEffect, useRef } from "react"
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

interface Message {
  role: "user" | "assistant"
  content: string
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
  overview: [
    "What automation frameworks and tools have you used across your different roles?",
    "How do you approach infrastructure automation and what's your experience with Infrastructure-as-Code?",
    "Can you describe your experience with Docker and containerization in production environments?",
    "What embedded systems and IoT projects have you worked on, and what were the key challenges?",
    "How do you balance automation, reliability, and speed when building infrastructure solutions?",
  ],
  toyota: [
    "What technologies did you use to build the Python-based IaC framework?",
    "How did you reduce deployment time from weeks to 5-10 minutes?",
    "What challenges did you face when making the framework work both as a web app and offline tool?",
    "How did you handle Docker orchestration and what improvements did you make?",
    "What was your role as Linux subject matter expert and what kind of support did you provide?",
    "How did you approach documentation and training for global engineering teams?",
  ],
  "aqua-robur": [
    "How did you achieve 60% efficiency improvement with Python automation for device provisioning?",
    "What was involved in optimizing the embedded C/C++ firmware for 30% better energy efficiency?",
    "Can you explain the portable sensor-testing hardware you built and how it worked?",
    "What was your experience with OPC-UA servers and SCADA/HMI systems?",
    "How did you approach security with certificate lifecycle management?",
  ],
  "goteborgs-sparvagor": [
    "What was involved in automating firmware deployment for live travel display systems?",
    "How did you ensure reliability when working with critical public transport infrastructure?",
    "What types of embedded systems did you work with (PLCs, vehicle computers, etc.)?",
    "How did you balance maintenance work with live operational requirements?",
    "What scripting and automation did you implement for the tram network infrastructure?",
  ],
}

const projectTitles: Record<string, { title: string; description: string }> = {
  overview: {
    title: "Career Overview & Technical Expertise",
    description: "Exploring automation, infrastructure, IoT, and embedded systems experience across multiple industries",
  },
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
  overview: `# Noor Latif — Career Overview

## Summary
Automation-driven engineer with 2+ years of experience building infrastructure automation frameworks, embedded IoT systems, and DevOps pipelines in production environments. Certified Industrial IoT Developer specializing in automation and cloud-based DevOps. Cross-domain experience across infrastructure automation, CI/CD, and real-time systems integration.

## Professional Background

### Infrastructure Automation & DevOps
- **Toyota Material Handling**: Built Python-based IaC framework reducing environment setup from weeks to 5–10 minutes
- Automated provisioning of Linux environments using Docker, Python, Bash, and PowerShell
- Delivered both as web app and offline tool for maximum flexibility
- Enhanced Docker orchestration and CI/CD pipeline troubleshooting with Azure DevOps
- Served as Linux subject matter expert supporting multi-OS systems

### Embedded Systems & IoT
- **Aqua Robur Technologies**: Optimized embedded C/C++ firmware, improving energy efficiency by 30%
- Automated device provisioning with Python, accelerating production by 60%
- Built portable sensor-testing hardware with live diagnostic feedback
- Managed OPC-UA servers and KepServerEX API integrations for SCADA/HMI systems
- Automated certificate lifecycle management for IoT security

### Critical Infrastructure
- **Göteborgs Spårvägar**: Automated firmware deployment for live travel display systems
- Maintained vehicle computers, PLCs, and network/video systems in real-time environments
- Delivered infrastructure upgrades improving uptime and system monitoring
- Worked with industrial IoT systems in live operational transport environment

### Web Development & Full-Stack
- **AI Portfolio Project**: Built Next.js web app with AI agent workflows and CI/CD pipelines
- **Götalands Trafikskola**: Built full-stack web platform automating course management and payments
- Implemented GitHub Actions and Vercel for automated deployment

## Core Competencies
- **Languages**: C++, C, Python, C#, Bash, SQL, JavaScript
- **Cloud & DevOps**: Docker, Azure DevOps, Oracle Cloud, GitHub Actions
- **Infrastructure & IaC**: Python-based IaC, PowerShell automation, Linux provisioning
- **Systems**: Linux (Expert), Windows Server
- **Monitoring**: Grafana, ELK Stack
- **Embedded Systems**: Embedded C/C++, firmware optimization, IoT security
- **Industrial IoT**: OPC-UA, SCADA/HMI, PLCs, sensor integration
- **Methodologies**: Agile (Scrum, Kanban), Sprint-based delivery

## Education & Certifications
- Higher Vocational Diploma in Industrial IoT Software Development (EC Utbildning, 2022)
- Certified Industrial IoT Developer (Infrastructure & Automation focus)
- Foundational C# with Microsoft
- Key Courses: Embedded C++, Industrial Cloud Solutions, IT Security, Agile Project Methods

## Notable Achievements
- Reduced deployment time from weeks to 5-10 minutes at Toyota
- 60% production efficiency improvement through automation at Aqua Robur
- 30% energy efficiency improvement in embedded firmware
- Automated critical infrastructure for Gothenburg's public transport network

## Languages & Availability
- English (Fluent), Swedish (Native)
- Available for relocation to Stockholm in 2026`,
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
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customQuestion, setCustomQuestion] = useState<string>("")
  const [streamingMessage, setStreamingMessage] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    // Reset conversation when project changes
    setMessages([])
    setError(null)
    setCustomQuestion("")
    setStreamingMessage("")
  }, [projectId])
  /* eslint-enable react-hooks/set-state-in-effect */

  // Smart auto-scroll: only scroll if user is near the bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current
      const threshold = 100 // pixels from bottom
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < threshold

      // Only auto-scroll if user is already near the bottom
      if (isNearBottom) {
        requestAnimationFrame(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
          }
        })
      }
    }
  }, [streamingMessage, messages])

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return

    // Add user message to history immediately
    const userMessage: Message = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setError(null)
    setIsLoading(true)
    setStreamingMessage("")

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          question,
          context: projectContexts[projectId || ""] || "",
          history: messages.map((msg) => ({ role: msg.role, content: msg.content })),
        }),
      })

      if (!res.ok) {
        if (res.status === 429) {
          setError("Rate limit exceeded. Please try again later.")
        } else {
          setError("Failed to get response from AI assistant.")
        }
        setIsLoading(false)
        // Remove the user message if request failed
        setMessages((prev) => prev.slice(0, -1))
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        setError("Failed to read response stream.")
        setIsLoading(false)
        setMessages((prev) => prev.slice(0, -1))
        return
      }

      let accumulatedResponse = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        accumulatedResponse += chunk
        setStreamingMessage(accumulatedResponse)
      }

      // Add assistant message to history
      const assistantMessage: Message = { role: "assistant", content: accumulatedResponse }
      setMessages((prev) => [...prev, assistantMessage])
      setStreamingMessage("")
      setIsLoading(false)
    } catch {
      setError("An error occurred while fetching the response.")
      setIsLoading(false)
      setMessages((prev) => prev.slice(0, -1))
    }
  }

  const handleQuestionClick = async (question: string) => {
    // Clear chat history to start fresh and avoid token accumulation
    setMessages([])
    setStreamingMessage("")
    setError(null)
    
    // Scroll to top of messages container to focus the response area
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = 0
    }
    
    await sendMessage(question)
  }

  const handleCustomQuestion = async () => {
    if (!customQuestion.trim()) return
    await sendMessage(customQuestion)
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
            <Card className="glass-strong border-[#00FFFF]/20 shadow-lg shadow-[#00FFFF]/5 font-[family-name:var(--font-inter)]">
              <CardHeader className="pb-4 sm:pb-5 border-b border-[#00FFFF]/10">
                <CardTitle className="text-base sm:text-lg font-mono font-semibold text-[#00FFFF]/90">
                  AI Assistant
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Powered by Mistral & Next.js</p>
              </CardHeader>
              <CardContent className="flex flex-col pt-4 sm:pt-6 h-full">
                {messages.length === 0 && (
                  <div className="space-y-2 sm:space-y-3 mb-4">
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
                )}

                <div
                  ref={messagesEndRef}
                  className="flex-1 min-h-[240px] sm:min-h-[320px] max-h-[400px] sm:max-h-[520px] overflow-y-auto rounded-xl bg-background/40 backdrop-blur-sm p-4 sm:p-6 border border-[#00FFFF]/10 custom-scrollbar space-y-3 sm:space-y-4 font-[family-name:var(--font-inter)]"
                  role="region"
                  aria-live="polite"
                  aria-busy={isLoading}
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-lg px-4 py-3 sm:px-5 sm:py-4 ${
                          message.role === "user"
                            ? "bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-foreground"
                            : "bg-background/60 border border-[#00FFFF]/20 text-foreground"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <ErrorBoundary>
                            <div
                              className="prose prose-invert prose-sm max-w-none text-xs sm:text-sm leading-relaxed break-words font-[family-name:var(--font-inter)]
                              [&>p]:mb-3 sm:[&>p]:mb-4 [&>p]:text-foreground/90 [&>p]:leading-relaxed
                              [&>ul]:mb-3 sm:[&>ul]:mb-4 [&>ul]:space-y-1.5 [&>ul>li]:text-foreground/90
                              [&>ol]:mb-3 sm:[&>ol]:mb-4 [&>ol]:space-y-1.5 [&>ol>li]:text-foreground/90
                              [&>h1]:mb-2 sm:[&>h1]:mb-3 [&>h1]:text-[#00FFFF] [&>h1]:font-semibold [&>h1]:text-sm sm:[&>h1]:text-base
                              [&>h2]:mb-2 sm:[&>h2]:mb-3 [&>h2]:text-[#00FFFF]/90 [&>h2]:font-semibold [&>h2]:text-xs sm:[&>h2]:text-sm
                              [&>h3]:mb-1.5 sm:[&>h3]:mb-2 [&>h3]:text-foreground [&>h3]:font-semibold [&>h3]:text-xs
                              [&>strong]:text-[#00FFFF]/80 [&>strong]:font-semibold
                              [&>code]:text-[#00FFFF] [&>code]:bg-[#00FFFF]/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs"
                            >
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                          </ErrorBoundary>
                        ) : (
                          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {streamingMessage && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] sm:max-w-[75%] rounded-lg px-4 py-3 sm:px-5 sm:py-4 bg-background/60 border border-[#00FFFF]/20">
                        <ErrorBoundary>
                          <div
                            className="prose prose-invert prose-sm max-w-none text-xs sm:text-sm leading-relaxed break-words font-[family-name:var(--font-inter)]
                            [&>p]:mb-3 sm:[&>p]:mb-4 [&>p]:text-foreground/90 [&>p]:leading-relaxed
                            [&>ul]:mb-3 sm:[&>ul]:mb-4 [&>ul]:space-y-1.5 [&>ul>li]:text-foreground/90
                            [&>ol]:mb-3 sm:[&>ol]:mb-4 [&>ol]:space-y-1.5 [&>ol>li]:text-foreground/90
                            [&>h1]:mb-2 sm:[&>h1]:mb-3 [&>h1]:text-[#00FFFF] [&>h1]:font-semibold [&>h1]:text-sm sm:[&>h1]:text-base
                            [&>h2]:mb-2 sm:[&>h2]:mb-3 [&>h2]:text-[#00FFFF]/90 [&>h2]:font-semibold [&>h2]:text-xs sm:[&>h2]:text-sm
                            [&>h3]:mb-1.5 sm:[&>h3]:mb-2 [&>h3]:text-foreground [&>h3]:font-semibold [&>h3]:text-xs
                            [&>strong]:text-[#00FFFF]/80 [&>strong]:font-semibold
                            [&>code]:text-[#00FFFF] [&>code]:bg-[#00FFFF]/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs"
                          >
                            <ReactMarkdown>{streamingMessage}</ReactMarkdown>
                          </div>
                        </ErrorBoundary>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-pulse" />
                          <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-pulse delay-75" />
                          <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-pulse delay-150" />
                        </div>
                      </div>
                    </div>
                  )}

                  {isLoading && messages.length > 0 && !streamingMessage && (
                    <div className="flex justify-start">
                      <div className="rounded-lg px-4 py-3 bg-background/60 border border-[#00FFFF]/20">
                        <Spinner className="w-5 h-5 text-[#00FFFF]" />
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 sm:p-5 rounded-lg bg-destructive/10 border border-destructive/30">
                      <p className="text-destructive text-xs sm:text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Scroll anchor for auto-scrolling */}
                  <div className="h-0" />
                </div>

                <div className="space-y-2 sm:space-y-3 pt-4 mt-4 border-t border-[#00FFFF]/10">
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

                <div className="space-y-2 sm:space-y-3 pt-4 mt-4 border-t border-[#00FFFF]/10">
                  <p className="text-xs sm:text-sm font-medium text-foreground/80 mb-3 sm:mb-4">Suggested Questions:</p>
                  <div className="space-y-2 sm:space-y-3">
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
                </div>
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
