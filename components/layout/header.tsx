"use client"
import { useContext, useEffect, useState } from "react";
import { ThemeToggle } from "../themeToggle";
import { navLinksData } from "@/src/data/navLinks";
import Link from "next/link";
import { Logo } from "../logo";
import { AsideContext } from "@/src/context/asideContext";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStartAPI } from "@/src/api/useStartAPI";

type props = {
  noNav?: boolean;
  noAnimate?: boolean;
}
export const Header = ({ noNav, noAnimate }: props) => {
  const [active, setActive] = useState(false);
  const asideCtx = useContext(AsideContext);
  const haveMenu = ["dashboard", "studies", "quizzes", "profile"];
  const pathname = usePathname();
  const { } = useStartAPI();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  return (
    <header className={`fixed z-50 transition-all duration-500 bg-background dark:bg-zinc-900 shadow-md shadow-secondary mx-auto border-2 border-muted-foreground/25
      ${active && !noAnimate ?
        'top-2 md:top-3 left-4 right-4 md:left-10 md:right-10 rounded-full w-80 sm:w-xl md:w-2xl lg:w-4xl' :
        'top-0 left-0 right-0 w-full'
      }
        ${noNav && 'p-3'}
    `}>
      <div className="container mx-auto flex justify-between items-center px-2 md:px-6 py-1 md:py-0">
        <Logo width={64} />
        {!noNav &&
          <nav className="hidden md:flex">
            <div className="flex items-center">
              {navLinksData.map((i) => (
                <Link key={i.id}
                  href={`#${i.href}`} className="text-lg hover:bg-secondary p-6"
                >
                  {i.name}
                </Link>
              ))}
            </div>
          </nav>
        }
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {haveMenu.some(i => pathname.includes(i)) &&
            <div className="p-1 border border-gray-20 rounded-sm hover:bg-gray-10 cursor-pointer lg:hidden"
              onClick={() => asideCtx?.setIsOpen(asideCtx.isOpen ? false : true)}>
              <Menu />
            </div>
          }
        </div>
      </div>
    </header>
  )
}