"use client";
import { AuroraBackground } from "@/src/components/ui/aurora-background";
import { motion } from "motion/react";
import { Button } from "../button";

export function AuroraBackgroundDemo() {
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
        <div id="hero" className="containerCustom justify-center items-center gap-7 mt-5">
          <h1 className="text-center font-bold tracking-tight text-pretty text-5xl sm:text-6xl md:text-7xl leading-12 lg:leading-20 max-w-3xl z-10">
            <p className="inline-block text-main-30 relative">
              Organize <span className="highlight_underline"></span></p> seus <p className="inline-block text-main-30 relative">estudos <span className="highlight_underline"></span>
            </p> na programação
          </h1>
          <h2 className="h2Custom font-semibold">O objetivo da DevOrganiza é organizar e facilitar os estudos dos desenvolvedores, tornando mais visível as suas metas e encurtando o tempo de alcançá-las.</h2>
          <motion.button
            initial={{ scale: 0.2 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut", }}
          >
            <Button href="/signup" size={3}>Criar conta</Button>
          </motion.button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}