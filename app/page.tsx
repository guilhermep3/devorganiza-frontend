"use client"
import { BackBtn } from "@/components/backBtn";
import { Button } from "@/components/button";
import { AuroraBackgroundDemo } from "@/components/layout/auroraBg";
import { Faq } from "@/components/layout/faq";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { aboutData } from "@/src/data/about";
import { servicesData } from "@/src/data/services";
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {

  return (
    <div className="relative">
      <Header />
      <AuroraBackgroundDemo />
      <div className="containerCustom p-2 rounded-lg overflow-hidden shadow-lg shadow-main-20 mt-20">
        <Image src={`/dashboard-devorganiza.png`} alt="dashboard"
          width={2400} height={2400}
          className="w-full rounded-lg"
        />
      </div>
      <section id="about" className="containerCustom justify-center items-center">
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

            return (
              <motion.div key={i.id}
                initial={{ scale: 0.3 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
              >
                <div className={`flex flex-col gap-4 p-6 rounded-lg text-white dark:text-black transition
                    shadow-lg shadow-gray-20 hover:shadow-gray-30 hover:-translate-y-1
                    ${i.id === 1 && 'bg-main-30'}
                    ${i.id === 2 && 'bg-green-20'}
                    ${i.id === 3 && 'bg-main-40'}
                    `}>
                  <div className="flex justify-between">
                    <p className="text-xl font-bold">
                      <span className="mr-2">{i.id}.</span> {i.title}
                    </p>
                    <Icon />
                  </div>
                  <p>{i.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
      <section id="services" className="bg-card">
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

              return (
                <motion.div key={i.id}
                  initial={{ scale: 0.3 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
                >
                  <div
                    className="flex flex-col gap-3 p-6 rounded-lg transition hover:shadow-md
                      hover:inset-shadow-sm hover:bg-gray-10 dark:hover:bg-background"
                  >
                    <div className="flex items-center gap-5">
                      <span>{i.id}.</span>
                      <div className="p-2 bg-main-10 rounded-sm">
                        <Icon />
                      </div>
                    </div>
                    <p className="text-lg font-semibold">{i.title}</p>
                    <p className="text-sm">{i.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      <section id="faq" className="containerCustom flex flex-col justify-center items-center">
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
      </section>
      <section id="start" className="relative overflow-hidden">
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
