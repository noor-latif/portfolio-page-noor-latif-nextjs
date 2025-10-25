import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Code2, Award, Target } from "lucide-react"

export function SkillsCertificationsSection() {
  const skills = [
    { name: "Infrastructure as Code (IaC)", tooltip: "Terraform/CloudFormation mindset" },
    { name: "Docker/Kubernetes Orchestration", tooltip: null },
    { name: "CI/CD Pipelines", tooltip: null },
    { name: "Linux/Windows Server Expert", tooltip: null },
    { name: "Network Troubleshooting", tooltip: null },
    { name: "Python (API/Scripting)", tooltip: "API development & automation scripting" },
    { name: "C# / .NET", tooltip: null },
    { name: "Embedded C/C++", tooltip: null },
  ]

  const certifications = ["Certified Industrial IoT Developer", "Foundational C# with Microsoft"]

  const focusTags = ["Automation", "Site Reliability", "Industrial IoT"]

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Core Competencies & Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technical expertise spanning infrastructure automation, IoT systems, and site reliability engineering
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Technical Skills Card */}
          <div className="md:col-span-2 glass-strong rounded-2xl p-8 border border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#00FFFF]/10">
                <Code2 className="w-5 h-5 text-[#00FFFF]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#00FFFF]">Technical Skills</h3>
            </div>
            <TooltipProvider>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) =>
                  skill.tooltip ? (
                    <Tooltip key={skill.name}>
                      <TooltipTrigger>
                        <Badge
                          variant="secondary"
                          className="text-sm py-2.5 px-4 bg-secondary/60 hover:bg-[#00FFFF]/20 hover:border-[#00FFFF] hover:scale-105 transition-all duration-200 cursor-help"
                        >
                          {skill.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-mono text-xs">{skill.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="text-sm py-2.5 px-4 bg-secondary/60 hover:bg-[#00FFFF]/20 hover:border-[#00FFFF] hover:scale-105 transition-all duration-200"
                    >
                      {skill.name}
                    </Badge>
                  ),
                )}
              </div>
            </TooltipProvider>
          </div>

          {/* Certifications & Focus Card */}
          <div className="glass-strong rounded-2xl p-8 border border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-all duration-300 space-y-8">
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#00FFFF]/10">
                  <Award className="w-5 h-5 text-[#00FFFF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#00FFFF]">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-[#00FFFF] mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-sm leading-relaxed">{cert}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-[#00FFFF]/20" />

            {/* Focus Areas */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#00FFFF]/10">
                  <Target className="w-5 h-5 text-[#00FFFF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#00FFFF]">Focus Areas</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {focusTags.map((tag) => (
                  <Badge
                    key={tag}
                    className="text-sm py-2.5 px-4 bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]/50 hover:bg-[#00FFFF]/20 hover:scale-105 transition-all duration-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
