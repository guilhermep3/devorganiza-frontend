import { navLinksData } from "@/src/data/navLinks"
import { Logo } from "../logo"
import Link from "next/link"

export const Footer = () => {

  return (
    <footer className="py-7 bg-main-10 md:px-10">
      <div className="containerCustom flex-col md:flex-row justify-between items-start gap-7">
        <div className="flex flex-col justify-between gap-1 md:gap-6 text-sm md:text-base">
          <Logo width={64} />
          <p>&copy; DevOrganiza</p>
          <p>&copy; Desenvolvido por <Link href={'https://github.com/guilhermep3'}
            target="_blank"
            className="font-semibold text-main-60 hover:underline"
          >
            Guilherme Pereira
          </Link>
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-semibold">Acesso rápido</h1>
          <div className="flex flex-col gap-1 md:gap-3">
            {navLinksData.map((i) => (
              <Link key={i.id} href={`/#${i.href}`}>
                {i.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-semibold">Termos</h1>
          <div className="flex flex-col gap-1 md:gap-3">
            <Link href={`/terms`}>
              Termos de Serviço
            </Link>
            <Link href={`/terms`}>
              Política de privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}