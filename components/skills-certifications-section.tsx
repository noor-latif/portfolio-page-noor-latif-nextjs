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
    <section id="skills" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-mono">
            Core Competencies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            Technical expertise spanning infrastructure automation, IoT systems, and SRE
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Technical Skills Card */}
          <div className="md:col-span-2 terminal-card p-8 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded bg-primary/10">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-primary font-mono">Technical Skills</h3>
            </div>
            <TooltipProvider>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) =>
                  skill.tooltip ? (
                    <Tooltip key={skill.name}>
                      <TooltipTrigger>
                        <Badge
                          variant="outline"
                          className="text-sm py-2 px-4 font-mono border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-200 cursor-help rounded-none"
                        >
                          {skill.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="bg-card border-primary/20 text-primary font-mono text-xs">
                        <p>{skill.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Badge
                      key={skill.name}
                      variant="outline"
                      className="text-sm py-2 px-4 font-mono border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-200 rounded-none"
                    >
                      {skill.name}
                    </Badge>
                  ),
                )}
              </div>
            </TooltipProvider>
          </div>

          {/* Certifications & Focus Card */}
          <div className="terminal-card p-8 space-y-8 group">
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-secondary/10">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-secondary font-mono">Certifications</h3>
              </div>
              <div className="space-y-4 font-mono text-sm">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-start gap-3 group/item">
                    <span className="text-secondary mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity">*</span>
                    <p className="leading-relaxed text-muted-foreground group-hover/item:text-foreground transition-colors">{cert}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Focus Areas */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded bg-accent/10">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-accent font-mono">Focus Areas</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {focusTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-sm py-1.5 px-3 font-mono border-accent/30 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-200 rounded-none"
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
