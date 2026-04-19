"use client"
import { BackBtn } from "@/components/backBtn";
import { Button } from "@/components/button";
import { HeroAuroraBackground } from "@/components/layout/auroraBg";
import { Faq } from "@/components/layout/faq";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { HomeCard } from "@/components/homeCard";
import { DottedBg } from "@/components/svg/dottedBG";
import { aboutData } from "@/src/data/about";
import { servicesData } from "@/src/data/services";
import { motion } from "motion/react";
import Image from "next/image";
import { handleEntrar } from "@/src/utils/entrar";

export default function Home() {

  return (
    <div className="relative">
      <Header noUser />
      <HeroAuroraBackground />
      <div className="relative">
        <DottedBg />
        <div className="ds-container">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl"
          >
            <Image src={`/dashboard-devorganiza.png`} alt="dashboard"
              width={2400} height={2400}
              className="w-full transition-transform duration-500 hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </div>
      <section id="about" className="relative">
        <DottedBg />
        <div className="ds-container justify-center items-center">
          <motion.h1 className="ds-heading-xl"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            O que o DevOrganiza proporciona?
          </motion.h1>
          <motion.h2 className="ds-heading-subtitle"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Veja os principais benefícios que nós oferecemos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.map((i) => {
              const Icon = i.icon;

              return (
                <motion.div key={i.id}
                  initial={{ scale: 0.4, y: -40, filter: 'blur(10px)' }}
                  whileInView={{ scale: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
                >
                  <HomeCard variant={i.id % 2 === 0 ? "primary" : "secondary"}
                    data={i} Icon={Icon}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      <section id="services" className="bg-background">
        <div className="ds-container justify-center items-center">
          <motion.h1 className="ds-heading-xl"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Nossas ferramentas
          </motion.h1>
          <motion.h2 className="ds-heading-subtitle"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Veja as ferramentas do nosso site
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
            {servicesData.map((i) => {
              const Icon = i.icon;

              return (
                <motion.div key={i.id}
                  initial={{ scale: 0.4, y: -40, filter: 'blur(10px)' }}
                  whileInView={{ scale: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
                >
                  <HomeCard variant="primary" data={i} Icon={Icon} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      <section id="faq" className="relative">
        <DottedBg />
        <div className="ds-container flex flex-col justify-center items-center">
          <motion.h1 className="ds-heading-xl"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            Perguntas Frequentes
          </motion.h1>
          <motion.h2 className="ds-heading-subtitle text-center"
            initial={{ scale: 0.4, y: -40 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
          >
            As principais dúvidas sobre nós
          </motion.h2>
          <Faq />
        </div>
      </section>
      <section id="start" className="relative overflow-hidden bg-background">
        <div className="ds-container items-center">
          <div className="w-full max-w-3xl text-center p-8 md:p-12 rounded-2xl 
            bg-linear-to-br from-main-10 via-background to-main-20
            border border-gray-30 backdrop-blur-md shadow-lg">
            <motion.h1 className="ds-heading-xl mt-0!"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Faça da organização e consistência suas maiores qualidades
            </motion.h1>
            <motion.h2 className="ds-heading-subtitle text-foreground mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Dê o primeiro passo para melhorar seus estudos na programação
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <Button onClick={handleEntrar} size={3}>
                Entrar
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
      <BackBtn />
    </div>
  );
}
