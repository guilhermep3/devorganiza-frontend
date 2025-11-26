import { Header } from "@/components/layout/header";
import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <div className="containerCustom justify-center items-center min-h-screen pt-24">
      <Header noNav />
      <div className="flex md:flex-row justify-center items-center gap-10 p-3 md:p-6 rounded-lg bg-background
        shadow-md shadow-gray-20 border border-gray-10"
      >
        {children}
        <div className="rounded-lg hidden md:flex overflow-hidden max-w-md h-[560px]">
          <Image src={"/auth.jpg"} alt="imagem de singin e signup"
            width={1000} height={1000}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}