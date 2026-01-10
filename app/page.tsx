"use client"
import { AboutCard } from "@/components/aboutCard";
import { BackBtn } from "@/components/backBtn";
import { Button } from "@/components/button";
import { AuroraBackgroundDemo } from "@/components/layout/auroraBg";
import { Faq } from "@/components/layout/faq";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ServicesCard } from "@/components/servicesCard";
import { DottedBg } from "@/components/svg/dottedBG";
import { aboutData } from "@/src/data/about";
import { servicesData } from "@/src/data/services";
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {

  return (
    <div className="relative">
      <Header />
      <AuroraBackgroundDemo />
      <div className="relative mt-20">
        <DottedBg />
        <div className="containerCustom justify-center items-center p-2 rounded-lg overflow-hidden shadow-lg shadow-main-20">
          <Image src={`/dashboard-devorganiza.png`} alt="dashboard"
            width={2400} height={2400}
            className="w-full rounded-lg"
          />
        </div>
      </div>
      <section id="about" className="relative">
        <DottedBg />
        <div className="containerCustom justify-center items-center">
          <motion.h1 className="h1Custom"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            O que o DevOrganiza proporciona?
          </motion.h1>
          <motion.h2 className="h2Custom"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Veja os principais benefícios que nós oferecemos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {aboutData.map((i) => {
              const Icon = i.icon;

              return (<AboutCard data={i} key={i.id} Icon={Icon} />)
            })}
          </div>
        </div>
      </section>
      <section id="services" className="bg-background">
        <div className="containerCustom justify-center items-center">
          <motion.h1 className="h1Custom"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Nossas ferramentas
          </motion.h1>
          <motion.h2 className="h2Custom"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Veja as ferramentas do nosso site
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
            {servicesData.map((i) => {
              const Icon = i.icon;

              return (<ServicesCard data={i} key={i.id} Icon={Icon} />)
            })}
          </div>
        </div>
      </section>
      <section id="faq" className="relative">
        <DottedBg />
        <div className="containerCustom flex flex-col justify-center items-center">
          <motion.h1 className="h1Custom"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Perguntas Frequentes
          </motion.h1>
          <motion.h2 className="h2Custom text-center"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            As principais dúvidas sobre nós
          </motion.h2>
          <Faq />
        </div>
      </section>
      <section id="start" className="overflow-hidden bg-background">
        <div className="containerCustom justify-center items-center">
          <motion.h1 className="h1Custom text-center max-w-2xl"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Faça da organização e consistência suas maiores qualidades
          </motion.h1>
          <motion.h2 className="h2Custom text-foreground"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Dê o primeiro passo para melhorar seus estudos na programação e progredir de maneira mais eficaz
          </motion.h2>
          <motion.button
            initial={{ scale: 0.2 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut", }}
          >
            <Button href="/signup">Criar conta</Button>
          </motion.button>
        </div>
      </section>
      <Footer />
      <BackBtn />
    </div>
  );
}
