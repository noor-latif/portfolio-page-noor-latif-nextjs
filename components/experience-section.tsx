"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, MapPin } from "lucide-react"

interface Experience {
    id: string
    role: string
    company: string
    period: string
    location: string
    description: string[]
    tech: string[]
}

const experiences: Experience[] = [
    {
        id: "toyota",
        role: "DevOps Engineer",
        company: "Toyota Material Handling",
        period: "2023 - Present",
        location: "Mjölby, Sweden",
        description: [
            "Architected IaC framework reducing deployment time by 95%",
            "Managed Kubernetes clusters for mission-critical applications",
            "Implemented comprehensive CI/CD pipelines using Azure DevOps"
        ],
        tech: ["Terraform", "Azure", "Kubernetes", "Python"]
    },
    {
        id: "aqua",
        role: "Embedded Systems Engineer",
        company: "Aqua Robur Technologies",
        period: "2021 - 2023",
        location: "Gothenburg, Sweden",
        description: [
            "Developed firmware for IoT turbines increasing energy efficiency by 30%",
            "Automated testing and deployment workflows",
            "Designed robust communication protocols for remote devices"
        ],
        tech: ["C/C++", "IoT", "AWS", "Jenkins"]
    },
    {
        id: "tram",
        role: "IT Infrastructure Specialist",
        company: "Göteborgs Spårvägar",
        period: "2019 - 2021",
        location: "Gothenburg, Sweden",
        description: [
            "Maintained critical datacenter infrastructure",
            "Scripted automated provisioning for network devices",
            "Provided 24/7 support for tram network control systems"
        ],
        tech: ["Linux", "Networking", "Bash", "VMware"]
    }
]

export function ExperienceSection() {
    return (
        <section id="experience" className="py-20 px-4 bg-background">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-mono">
                        Experience
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
                        Chronological history of professional deployments
                    </p>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                            {/* Timeline Icon */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                                <Briefcase className="w-5 h-5 text-primary" />
                            </div>

                            {/* Card */}
                            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] terminal-card p-6 relative">
                                <div className="absolute top-6 -left-2 w-4 h-4 bg-card border-l border-b border-border rotate-45 md:block hidden group-even:left-auto group-even:-right-2 group-even:border-l-0 group-even:border-r group-even:border-b-0 group-even:border-t" />

                                <CardHeader className="p-0 mb-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <h3 className="text-xl font-bold font-mono text-primary">{exp.role}</h3>
                                        <Badge variant="outline" className="w-fit font-mono text-xs border-secondary/30 text-secondary">
                                            {exp.period}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col gap-1 text-sm text-muted-foreground font-mono">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-foreground">{exp.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-80">
                                            <MapPin className="w-3 h-3" />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-0 space-y-4">
                                    <ul className="space-y-2">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="text-sm text-muted-foreground font-mono flex items-start gap-2">
                                                <span className="text-primary mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {exp.tech.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="text-xs font-mono bg-primary/5 hover:bg-primary/10 text-primary/80 rounded-sm">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
