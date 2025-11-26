"use client"
import { Logo } from "@/components/logo"
import { AsideContext } from "@/src/context/asideContext"
import { asideLinks } from "@/src/data/asideLinks"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"

export const AsideDashboard = () => {
  const pathname = usePathname();
  const asideCtx = useContext(AsideContext);

  return (
    <aside className={`bg-card w-72 p-3 space-y-6 transition-all duration-300 h-full z-20
      fixed md:static md:block ${asideCtx?.isOpen ? 'ml-0' : '-ml-[100%] md:ml-0'}
    `}
    >
      <div className="flex justify-center items-center gap-2">
        <Logo width={80} />
        <p className="text-xl font-bold -mb-1 text-main-60">DevOrganiza</p>
      </div>
      <div className="flex flex-col gap-2">
        {asideLinks.map((i) => {
          const Icon = i.icon;

          return (
            <Link key={i.id} href={`/${i.href}`}
              className={`flex items-center gap-2 p-2 font-semibold rounded-md
                ${pathname.includes(i.href)
                  ? 'text-main-60 border border-main-40 bg-main-30/15'
                  : 'hover:text-main-60'}
              `}
            >
              <Icon />
              {i.name}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}