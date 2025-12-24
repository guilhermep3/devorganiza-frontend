import { Logo } from "../logo"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export const Footer = () => {

  return (
    <footer className="bg-card">
      <div className="containerCustom flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex justify-center items-center gap-2">
          <Logo width={64} />
          <p className="text-lg font-bold -mb-1 text-main-60">DevOrganiza</p>
        </div>
        <div className="flex flex-col gap-6 text-sm">
          <div>
            &copy; Desenvolvido por <Link href={'https://github.com/guilhermep3'}
              target="_blank"
              className="font-semibold text-main-60 hover:underline"
            >
              Guilherme Pereira
            </Link>
          </div>
          <div className="flex flex-col gap-1 md:gap-3">
            <Link href={`/terms`} className="hover:underline w-fit text-main-60">
              Termos de Serviço
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href={`https://www.linkedin.com/in/guilherme-pereira3/`}
            target="_blank"
            className="text-main-30 p-2 border border-main-20 rounded-sm"
          >
            <Linkedin className="fill-main-20" />
          </Link>
          <Link href={`https://github.com/guilhermep3`}
            target="_blank"
            className="text-main-30 p-2 border border-main-20 rounded-sm"
          >
            <Github className="fill-main-20" />
          </Link>
        </div>
      </div>
    </footer>
  )
}