"use client"
import { ChevronDown, CircleDollarSign, CircleQuestionMark, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "O que é o DevOrganiza?",
      answer: "O DevOrganiza é uma plataforma para desenvolvedores organizarem seus estudos na programação, além de praticar seus estudos com quizzes de cada tecnologia que você está estudando.",
      icon: <CircleQuestionMark />
    },
    {
      question: "O DevOrganiza é pago?",
      answer: "Não, nossos serviços são totalmente gratuitos, basta criar uma conta e você já pode organizar melhor seus estudos e se divertir com nosso quizzes.",
      icon: <CircleDollarSign />
    },
    {
      question: "A plataforma é segura?",
      answer: "Sim, tomamos todos os cuidados para garantir que seus dados estejam sempre protegidos.",
      icon: <ShieldCheck />
    },
  ]

  function toggleQuestion(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="flex flex-col gap-7 w-full max-w-xl">
      {faqData.map((i, index) => (
        <div key={index} className="w-full flex">
          <div className="flex flex-col items-center gap-1 w-full bg-background rounded-md shadow-sm ">
            <div className="flex justify-between items-center gap-5 p-3 w-full cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <div className="text-gray-50 p-2 border border-gray-20 rounded-sm mb-auto">
                {i.icon}
              </div>
              <p className="font-bold cursor-pointer">{i.question}</p>
              <div className="ml-auto">
                <ChevronDown
                  className={`transition-all duration-300 ${openIndex === index && 'rotate-180'}`}
                />
              </div>
            </div>
            <div className={`text-gray-50 ml-14 transition-all duration-300
              ${openIndex === index
                ? 'translate-y-0 max-h-96 opacity-100 pointer-events-auto pb-4'
                : '-translate-y-5 h-0 opacity-0 pointer-events-none pb-0'}`}
            >
              {i.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}