import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsCertificationsSection } from "@/components/skills-certifications-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <main id="main" className="min-h-screen pt-16 bg-background">
      <HeroSection />

      <Separator className="bg-border/50 h-px" />

      <ExperienceSection />

      <Separator className="bg-border/50 h-px" />

      <SkillsCertificationsSection />

      <Separator className="bg-border/50 h-px" />

      <CaseStudiesSection />

      <Separator className="bg-border/50 h-px" />

      <Footer />
    </main>
  )
}
