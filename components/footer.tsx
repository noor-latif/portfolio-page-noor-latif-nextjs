import { Linkedin, Mail, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact Links */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <a href="https://www.linkedin.com/in/noorlatif" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <a href="mailto:noor@latif.se">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Email</span>
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>

          {/* Version Info */}
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span>© 2024 Noor Latif</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
