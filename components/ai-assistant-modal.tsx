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
    "How does your Python-based IaC framework at Toyota demonstrate test infrastructure engineering skills, and have you worked with test automation frameworks like pytest?",
    "What experience do you have with CI/CD pipelines (GitLab CI, Azure DevOps, GitHub Actions) and analyzing test results or resolving test failures?",
    "How does your work with portable sensor-testing hardware at Aqua Robur relate to building and maintaining hardware test rigs?",
    "Can you explain your experience with Docker containerization, including cgroups and namespaces, for test environment infrastructure?",
    "How does your embedded systems interfacing experience (sensors, PLCs, vehicle computers) apply to hardware test infrastructure?",
    "What examples show your ability to ensure test environment reliability and reproducibility, like reducing setup from weeks to minutes?",
  ],
  toyota: [
    "Did you use test automation frameworks like pytest with your Python-based IaC framework?",
    "How did you integrate your test infrastructure with CI/CD pipelines (Azure DevOps), and do you have experience with GitLab CI?",
    "What Docker containerization details did you work with (cgroups, namespaces, Docker Compose) for test environments?",
    "How did you achieve test environment reproducibility, reducing setup from weeks to 5-10 minutes?",
    "How did you monitor, analyze test results, and resolve test failures in your CI pipelines?",
    "What made the one-click test environment setup possible on engineers' laptops?",
  ],
  "aqua-robur": [
    "How does your portable sensor-testing hardware relate to building hardware test rigs for embedded systems?",
    "What embedded systems interfacing did you do when integrating sensors and testing firmware?",
    "Did you use test automation frameworks (like pytest) with your Python automation for device provisioning?",
    "Did you work with electronics lab tools (multimeters, oscilloscopes) during hardware development and testing?",
    "How did your embedded C/C++ firmware optimization work relate to firmware testing infrastructure?",
    "How did the live diagnostic feedback and real-time troubleshooting capabilities work in your testing hardware?",
  ],
  "goteborgs-sparvagor": [
    "What hardware test infrastructure did you build or maintain for embedded devices like vehicle computers and PLCs?",
    "How did you integrate CI/CD practices with your automated firmware deployment scripts for embedded systems?",
    "What testing procedures or test rigs did you use for embedded systems in live operational environments?",
    "How did you interface with embedded systems like PLCs and vehicle computers during maintenance and testing?",
    "How did you maintain test infrastructure for critical systems without disrupting live tram services?",
  ],
}

const projectTitles: Record<string, { title: string; description: string }> = {
  overview: {
    title: "Test Infrastructure Engineer - Role Fit Assessment",
    description: "AI-powered analysis of fit for Test Infrastructure Engineer roles: Python automation, CI/CD, embedded systems, and hardware test infrastructure",
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
  overview: `# Noor Latif — Test Infrastructure Engineer Overview

## Summary
Automation-driven engineer with hands-on impact across infrastructure-as-code (IaC), CI/CD automation, test environment infrastructure, and embedded systems. Built Python-based IaC framework at Toyota Material Handling reducing test environment setup from weeks to 5–10 minutes. Automated device provisioning at Aqua Robur with 60% efficiency gain. Automated firmware deployment scripts for live systems at Göteborgs Spårvägar.

## Experience Mapping for Test Infrastructure Engineer Roles

### Python & Test Automation
- **Toyota**: Built Python-based Infrastructure-as-Code framework for test environments, reducing setup from weeks to 5–10 minutes
- **Aqua Robur**: Automated device provisioning with Python, accelerating production by 60% and eliminating manual errors
- **Portfolio**: Implemented CI/CD pipelines using GitHub Actions for automated deployment

### CI/CD & Pipeline Integration
- **Toyota**: Assisted with CI/CD pipeline troubleshooting, worked with Azure DevOps
- **Portfolio**: GitHub Actions for automated deployment workflows
- Experience with pipeline development, optimization, and result analysis

### Test Infrastructure & Environment Setup
- **Toyota**: Built IaC framework enabling engineers to spin up complete test environments on laptops with one-click simplicity
- Delivered both as web app and offline tool for maximum flexibility
- Automated provisioning of Linux environments using Docker, Python, Bash, and PowerShell
- Focused on test environment reliability and reproducibility

### Embedded Systems & Firmware
- **Aqua Robur**: Optimized embedded C/C++ firmware, improving energy efficiency by 30%
- Built portable sensor-testing hardware with live diagnostic feedback
- **Göteborgs Spårvägar**: Automated firmware deployment scripts for live travel display systems
- Experience with hardware-software integration and testing equipment

### Hardware & Infrastructure
- **Aqua Robur**: Built portable sensor-testing hardware, worked with industrial IoT systems
- **Göteborgs Spårvägar**: Supported vehicle computers, PLCs, and network/video systems in real-time environments
- Experience with hardware test infrastructure and embedded device integration

### Linux & Containerization
- **Linux Expert**: Served as Linux subject matter expert, supporting multi-OS systems
- **Docker**: Enhanced Docker orchestration and Bash scripts, created reusable Docker Compose configurations
- **Infrastructure**: Automated provisioning, system reliability improvements, container best practices

### Collaboration & Documentation
- **Toyota**: Authored documentation and training resources, collaborated with engineering teams globally
- **Aqua Robur**: Mentored thesis students on firmware and IoT development
- Managed full project lifecycle from planning to delivery within Agile sprints

## Key Technologies
- **Languages**: Python, C++, C, Bash, PowerShell
- **CI/CD**: GitHub Actions, Azure DevOps, CI/CD pipeline troubleshooting
- **Infrastructure**: Docker, Linux (expert), IaC, container orchestration
- **Embedded Systems**: Embedded C/C++, firmware optimization, hardware development
- **Industrial IoT**: OPC-UA, SCADA/HMI, PLCs, sensor integration

## Notable Achievements
- **Toyota**: Weeks-to-minutes test environment setup; Python-based IaC framework; web app and offline tool delivery
- **Aqua Robur**: 60% production efficiency gain through Python automation; 30% energy efficiency improvement in firmware
- **Göteborgs Spårvägar**: Automated firmware deployment scripts for live systems; infrastructure upgrades improving uptime

## What to Ask
Tailored prompts for recruiters and hiring managers to assess fit for Test Infrastructure Engineer roles, focusing on Python automation, CI/CD, embedded systems, hardware test infrastructure, and collaboration with firmware/hardware teams.`,
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

  // Auto-scroll to bottom when streaming or messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
        }
      })
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
            <Card className="glass-strong border-[#00FFFF]/20 shadow-lg shadow-[#00FFFF]/5">
              <CardHeader className="pb-4 sm:pb-5 border-b border-[#00FFFF]/10">
                <CardTitle className="text-base sm:text-lg font-mono font-semibold text-[#00FFFF]/90">
                  AI Assistant
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Powered by Mistral & Next.js</p>
              </CardHeader>
              <CardContent className="flex flex-col pt-4 sm:pt-6 h-full">
                <div
                  ref={messagesEndRef}
                  className="flex-1 min-h-[240px] sm:min-h-[320px] max-h-[400px] sm:max-h-[520px] overflow-y-auto rounded-xl bg-background/40 backdrop-blur-sm p-4 sm:p-6 border border-[#00FFFF]/10 custom-scrollbar space-y-3 sm:space-y-4"
                  role="region"
                  aria-live="polite"
                  aria-busy={isLoading}
                >
                  {messages.length === 0 && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-2 sm:gap-3">
                      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#00FFFF]/30" />
                      <p className="text-muted-foreground text-xs sm:text-sm text-center font-medium px-4">
                        Select a question below to start the conversation
                      </p>
                    </div>
                  )}

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
                              className="prose prose-invert prose-sm max-w-none text-xs sm:text-sm leading-relaxed break-words
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
                            className="prose prose-invert prose-sm max-w-none text-xs sm:text-sm leading-relaxed break-words
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
