"use client"
import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
import { useQuiz } from "@/src/api/quiz/useQuiz"
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"

export default function Page() {
  const { push } = useRouter();
  const { quizId } = useParams();
  const { data, loading, error } = useQuiz(quizId as string);

  return (
    <div className="layoutDiv">
      {loading || !data ? (
        <div>carregando</div>
      ) : (
        <section className="relative flex flex-col justify-center items-center gap-6">
          <div className="absolute left-0 top-0 p-0.5 border border-gray-30 rounded-full" onClick={() => push('/quizzes')}>
            <ArrowLeft className="cursor-pointer w-5 h-5" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <Logo width={80} />
            <p className="text-xl font-bold -mb-1 text-main-60">DevOrganiza</p>
          </div>
          <Image src={`${data.imageUrl}`} alt={data.title}
            width={400} height={400}
            className="h-60 object-contain"
          />
          <div className="flex flex-col items-center gap-2 text-xs md:text-sm">
            <h1 className="text-2xl md:text-3xl font-extrabold">Quizz {data.title}</h1>
            <div className="flex items-center justify-between gap-5 text-gray-50">
              <p>15 - 30 min </p>
              <span>|</span>
              <p>{data.questions.length} perguntas</p>
            </div>
          </div>
          <p className="text-center">{data.description}</p>
          <Button>Iniciar Quiz</Button>
        </section>
      )}
    </div>
  )
}