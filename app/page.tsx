import { BackBtn } from "@/components/backBtn";
import { Button } from "@/components/button";
import { AOSPage } from "@/components/layout/aos";
import { AuroraBackgroundDemo } from "@/components/layout/auroraBg";
import { Faq } from "@/components/layout/faq";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { aboutData } from "@/src/data/about";
import { servicesData } from "@/src/data/services";
import Image from "next/image";

export default function Home() {

  return (
    <AOSPage>
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
          <h1 data-aos="fade-up" className="h1Custom">O que o DevOrganiza proporciona?</h1>
          <h2 data-aos="fade-down" className="h2Custom">Veja os principais benefícios que nós oferecemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {aboutData.map((i) => {
              const Icon = i.icon;

              return (
                <div key={i.id} data-aos="zoom-in">
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
                </div>
              )
            })}
          </div>
        </section>
        <section id="services" className="bg-card">
          <div className="containerCustom justify-center items-center">
            <h1 data-aos="fade-up" className="h1Custom">Nossas ferramentas</h1>
            <h2 data-aos="fade-down" className="h2Custom">Veja as ferramentas do nosso site</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
              {servicesData.map((i) => {
                const Icon = i.icon;

                return (
                  <div key={i.id} data-aos="zoom-in">
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
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <section id="faq" className="containerCustom flex flex-col justify-center items-center">
          <h1 data-aos="fade-up" className="h1Custom text-center">Perguntas Frequentes</h1>
          <h2 data-aos="fade-down" className="h2Custom text-center">As principais dúvidas sobre nós</h2>
          <Faq />
        </section>
        <section id="start" className="relative overflow-hidden">
          <div className="containerCustom justify-center items-center">
            <h1 data-aos="fade-up" className="h1Custom text-center max-w-2xl">Faça da organização e consistência suas maiores qualidades</h1>
            <h2 data-aos="fade-down" className="h2Custom text-foreground">Dê o primeiro passo para melhorar seus estudos na programação e progredir de maneira mais eficaz</h2>
            <Button href="/signup">Criar conta</Button>

          </div>
        </section>
        <Footer />
        <BackBtn />
      </div>
    </AOSPage>
  );
}
