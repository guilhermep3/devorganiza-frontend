import { Logo } from "../logo"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export const Footer = () => {
  
  return (
    <footer className="bg-card border-t border-main-20">
      <div className="containerCustom py-10 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Logo width={56} />
            <span className="text-xl font-bold text-main-60">DevOrganiza</span>
          </div>
          <nav className="flex flex-col sm:flex-row gap-4 text-sm">
            <Link href="/terms"
              className="text-main-60 hover:text-main-80 transition-colors"
            >
              Termos de Serviço
            </Link>
          </nav>
          <div className="flex gap-3">
            <Link href="https://www.linkedin.com/in/guilherme-pereira3/" target="_blank"
              className="p-2 rounded-md border border-main-20 text-main-40 hover:text-main-80 hover:border-main-40 transition"
            >
              <Linkedin size={18} />
            </Link>
            <Link href="https://github.com/guilhermep3" target="_blank"
              className="p-2 rounded-md border border-main-20 text-main-40 hover:text-main-80 hover:border-main-40 transition"
            >
              <Github size={18} />
            </Link>
          </div>
        </div>
        <div className="h-px bg-main-20/50" />
        <div className="text-xs text-main-40 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} DevOrganiza</span>
          <span>
            Desenvolvido por{" "}
            <Link href="https://github.com/guilhermep3" target="_blank"
              className="font-medium text-main-60 hover:underline"
            >
              Guilherme Pereira
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
