"use client";
import { AuroraBackground } from "@/src/components/ui/aurora-background";
import { motion } from "motion/react";
import { Button } from "../button";
import { Logo } from "../logo";

export function HeroAuroraBackground() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 text-foreground"
      >
        <div id="hero" className="containerCustom justify-center items-center gap-6 mt-4">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60
            backdrop-blur-md border border-gray-30 shadow-md"
          >
            <Logo width={32} />
            <span className="font-semibold tracking-tight text-sm md:text-base text-main-70">
              DevOrganiza
            </span>
          </div>
          <h1 className="text-center font-extrabold tracking-tight text-pretty text-5xl sm:text-6xl md:text-7xl leading-12 lg:leading-20 max-w-3xl z-10">
            <p className="inline-block text-main-30 relative">
              Organize <span className="highlight_underline"></span></p> seus <p className="inline-block text-main-30 relative">estudos <span className="highlight_underline"></span>
            </p> na <span className="text-transparent bg-linear-to-r from-main-70 to-main-60 bg-clip-text">programação</span>
          </h1>
          <h2 className="h2Custom font-semibold md:text-lg mb-8!">
            Organize e facilite seus estudos de desenvolvedor,
            torne mais visível as suas metas e encurta o tempo de alcançá-las.
          </h2>
          <motion.button
            initial={{ scale: 0.2 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut", }}
          >
            <Button href="/dashboard" size={3}>Entrar</Button>
          </motion.button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}