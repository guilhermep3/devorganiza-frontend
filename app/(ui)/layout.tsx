import { AsideDashboard } from "@/components/layout/dashboard/aside";
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
      <div>
        <Header />
        <div className="flex min-h-screen">
          <AsideDashboard />
          <main className="w-full max-w-6xl mx-auto px-3 pb-20 pt-28">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </AsideProvider>
  )
}