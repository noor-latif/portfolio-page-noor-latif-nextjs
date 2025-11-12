import { Linkedin, Mail, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact Links */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-[#00FFFF]/10 hover:text-[#00FFFF] transition-all"
            >
              <a href="https://www.linkedin.com/in/noorlatif" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 text-[#00FFFF]" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-[#00FFFF]/10 hover:text-[#00FFFF] transition-all"
            >
              <a href="mailto:noor@latif.se">
                <Mail className="w-6 h-6 text-[#00FFFF]" />
                <span className="sr-only">Email</span>
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-[#00FFFF]/10 hover:text-[#00FFFF] transition-all"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6 text-[#00FFFF]" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>

          {/* Version Info */}
          <div className="text-sm font-mono text-muted-foreground">
            Built with Next.js, Tailwind, & Mistral | V: 1.0.0
          </div>
        </div>
      </div>
    </footer>
  )
}
