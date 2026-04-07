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

  const toggleAside = () => asideCtx?.setIsOpen(!asideCtx.isOpen);

  return (
    <>
      <aside className={`bg-card w-72 p-3 space-y-6 transition-all duration-300 min-h-full z-30 pt-24
      fixed border-r border-gray-20 ${asideCtx?.isOpen ? 'ml-0' : '-ml-[100%] lg:ml-0'}
      `}
      >
        <div className="flex justify-center items-center gap-2">
          <Logo width={80} />
          <p className="text-xl font-bold -mb-1 text-main-60">DevOrganiza</p>
        </div>
        <div className="flex flex-col gap-2">
          {asideLinks.map((i) => {
            const Icon = i.icon;
            const isActive = pathname.includes(i.href);

            return (
              <Link key={i.id} href={`/${i.href}`}
                onClick={toggleAside}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg
                  font-medium transition-all duration-200 border
                  ${isActive
                    ? 'text-main-70 bg-main-20/25 border-main-40/50 shadow-sm'
                    : 'text-gray-60 hover:bg-muted hover:text-foreground border-transparent'
                  }
                `}
              >
                <span className={`transition-colors duration-200
                  ${isActive ? 'text-main-70' : 'text-gray-60 group-hover:text-foreground'}
                `}>
                  <Icon size={20} className="stroke-3" />
                </span>
                {i.name}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-main-60" />
                )}
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