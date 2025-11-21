import { navLinksData } from "@/src/data/navLinks"
import { Logo } from "../logo"
import Link from "next/link"

export const Footer = () => {

  return (
    <footer className="py-7 bg-main-10">
      <div className="container-custom flex-row justify-between items-start gap-7">
        <div className="flex flex-col justify-between gap-6">
          <Logo />
          <p>&copy; DevOrganiza</p>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-semibold">Acesso rápido</h1>
          <div className="flex flex-col gap-3">
            {navLinksData.map((i) => (
              <Link key={i.id} href={`#${i.href}`}>
                {i.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-semibold">Termos</h1>
          <div className="flex flex-col gap-3">
            <Link href={`#`}>
              Termos de Serviço
            </Link>
            <Link href={`#`}>
              Política de privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}