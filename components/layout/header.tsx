"use client"
import { useEffect, useState } from "react";
import { ThemeToggle } from "../themeToggle";
import { navLinksData } from "@/src/data/navLinks";
import Link from "next/link";
import { Logo } from "../logo";

export const Header = () => {
  const [active, setActive] = useState(false);

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
      ${active ?
        'top-2 md:top-3 left-4 right-4 md:left-10 md:right-10 rounded-full w-80 sm:w-xl md:w-2xl lg:w-4xl' :
        'top-0 left-0 right-0 w-full'}
    `}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 py-3 md:py-0">
        <Logo />
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
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}