import { HeroSection } from "@/components/hero-section"
import { SkillsCertificationsSection } from "@/components/skills-certifications-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <Separator className="bg-[#00FFFF]/50 h-px" />

      <SkillsCertificationsSection />

      <Separator className="bg-[#00FFFF]/50 h-px" />

      <CaseStudiesSection />

      <Separator className="bg-[#00FFFF]/50 h-px" />

      <Footer />
    </main>
  )
}
