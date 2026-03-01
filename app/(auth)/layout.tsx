import { Header } from "@/components/layout/header";
import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header noNav />
      <main className="flex flex-1 items-center justify-center px-4 py-10 md:mt-10">
        <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-xl bg-card
          border border-gray-30 shadow-md shadow-gray-20 overflow-hidden"
        >
          <div className="flex items-center justify-center p-5 md:p-8">
            {children}
          </div>
          <div className="relative hidden md:block min-h-[560px] dark:brightness-75">
            <Image src="/blue-mountains.jpg" alt="imagem de signin e signup"
              fill priority
              className="object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}