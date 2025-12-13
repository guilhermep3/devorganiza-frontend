import { AsideDashboard } from "@/components/layout/aside";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AsideProvider } from "@/src/context/asideContext";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
}
export default function Layout({ children }: props) {

  return (
    <AsideProvider>
      <Header noNav noAnimate />
      <div className="flex min-h-screen">
        <AsideDashboard />
        <div className="flex-1 pl-0 lg:pl-72">
          <main className="w-full max-w-6xl mx-auto px-3 pb-20 pt-28 min-h-[560px]">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </AsideProvider>
  )
}