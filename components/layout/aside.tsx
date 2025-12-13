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
    <>
      <aside className={`bg-card w-72 p-3 space-y-6 transition-all duration-300 min-h-full z-30 pt-24
      fixed ${asideCtx?.isOpen ? 'ml-0' : '-ml-[100%] lg:ml-0'}
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
              <Link key={i.id} href={`/${i.href}`} onClick={() => asideCtx?.setIsOpen(asideCtx.isOpen ? false : true)}
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
      <div
        className={`lg:hidden fixed z-20 bg-black/50 inset-0 transition-all duration-300
          ${asideCtx?.isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => asideCtx?.setIsOpen(asideCtx.isOpen ? false : true)}
      ></div>
    </>
  )
}