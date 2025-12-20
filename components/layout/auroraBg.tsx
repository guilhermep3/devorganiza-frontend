"use client";

import { AuroraBackground } from "@/src/components/ui/aurora-background";
import { motion } from "motion/react";
import React from "react";
import { Button } from "../button";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 text-foreground"
      >
        <div id="hero" className="containerCustom justify-center items-center gap-7">
          <h1 data-aos="fade-up" className="text-center font-bold tracking-tight text-pretty text-5xl sm:text-6xl md:text-7xl leading-12 lg:leading-20 max-w-3xl z-10">
            <p className="inline-block text-main-30 relative">Organize <span className="highlight_underline"></span></p> seus <p className="inline-block text-main-30 relative">estudos <span className="highlight_underline"></span></p> na programação
          </h1>
          <h2 data-aos="fade-down" className="h2Custom font-semibold">O objetivo da DevOrganiza é organizar e facilitar os estudos dos desenvolvedores, tornando mais visível as suas metas e encurtando o tempo de alcançá-las.</h2>
          <Button data-aos="zoom-in" href="/signup" size={3}>Criar conta</Button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
