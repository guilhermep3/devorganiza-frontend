"use client"
import { AuthFeatureCard } from "@/components/authFeatureCard";
import { Footer } from "@/components/layout/footer";
import { aboutData } from "@/src/data/about";
import { ReactNode } from "react";
import { motion } from "motion/react"

export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col bg-background pt-16">
      <main className="flex flex-1 items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl bg-card border border-border shadow-2xl overflow-hidden min-h-[700px]">
          <div className="flex items-center justify-center p-7 lg:p-10">
            {children}
          </div>
          <div className="hidden md:flex flex-col justify-center p-10 bg-main-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-main-40 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-3">
                <span className="text-main-10 dark:text-main-70 font-bold tracking-widest uppercase text-xs">
                  DEVORGANIZA
                </span>
                <h2 className="text-4xl font-extrabold text-white leading-tight">
                  Entre para organizar seus estudos e praticar com quizzes
                </h2>
                <p className="text-main-10 dark:text-main-70 text-lg opacity-90">
                  Centralize suas anotações de estudos e acompanhe seu desempenho.
                </p>
              </div>
              <div className="grid gap-4">
                {aboutData.map((i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7 }}
                  >
                    <AuthFeatureCard key={i.id}
                      Icon={i.icon}
                      title={i.title}
                      description={i.description}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}