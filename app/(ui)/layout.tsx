import { AsideDashboard } from "@/components/layout/aside";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AsideProvider } from "@/src/context/asideContext";
import { ReactNode, useEffect } from "react";
import { getToken } from "@/src/utils/token";
import { useRouter } from "next/navigation";

type props = {
  children: ReactNode;
}
export default function Layout({ children }: props) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/signin");
    }
  }, []);

  return (
    <AsideProvider>
      <Header noNav noAnimate />
      <div className="flex min-h-screen">
        <AsideDashboard />
        <div className="flex-1 pl-0 lg:pl-72">
          <main className="w-full max-w-6xl mx-auto px-3 pb-20 pt-28 min-h-[560px] 2xl:min-h-[800px]">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </AsideProvider>
  )
}