import { BackBtn } from "@/components/backBtn";
import { Button } from "@/components/button";
import { AOSPage } from "@/components/layout/aos";
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
        <section id="hero" className="pt-24! h-screen bg-linear-to-b from-main-10 to-background">
          <div className="containerCustom justify-center items-center gap-7">
            <h1 data-aos="fade-up" className="text-center font-bold tracking-tight text-pretty text-5xl sm:text-6xl md:text-7xl leading-12 lg:leading-20 max-w-3xl z-10">
              <p className="inline-block text-main-30 relative">Organize <span className="highlight_underline"></span></p> seus <p className="inline-block text-main-30 relative">estudos <span className="highlight_underline"></span></p> na programação
            </h1>
            <h2 data-aos="fade-down" className="h2Custom">O objetivo da DevOrganiza é organizar e facilitar os estudos dos desenvolvedores, tornando mais visível as suas metas e encurtando o tempo de alcançá-las.</h2>
            <Button data-aos="zoom-in" href="/signup" size={3}>Criar conta</Button>
          </div>
        </section>
        <div className="containerCustom py-0! rounded-lg overflow-hidden shadow-md shadow-main-20">
          <Image src={`/dashboard-devorganiza.png`} alt="dashboard"
            width={2400} height={2400}
            className="w-full"
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
                  <div className={`flex flex-col gap-4 p-6 rounded-lg text-black transition
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
        <section id="services" className="bg-gray-10/50">
          <div className="containerCustom justify-center items-center">
            <h1 data-aos="fade-up" className="h1Custom">Nossas ferramentas</h1>
            <h2 data-aos="fade-down" className="h2Custom">Veja as ferramentas do nosso site</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
              {servicesData.map((i) => {
                const Icon = i.icon;

                return (
                  <div key={i.id} data-aos="zoom-in">
                    <div className="flex flex-col gap-3 p-6 rounded-lg transition hover:shadow-md hover:inset-shadow-sm hover:bg-white hover:dark:bg-gray-10">
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
            <div className="absolute inset-x-0 h-[480px] -z-10 rounded-t-[100%] translate-y-10 scale-110 md:scale-100
          bg-radial from-main-20/75 via-main-10 to-background"
            ></div>
          </div>
        </section>
        <Footer />
        <BackBtn />
      </div>
    </AOSPage>
  );
}
