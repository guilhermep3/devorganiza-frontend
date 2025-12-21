"use client"
import { Button } from "@/components/button";
import { LoadingPage } from "@/components/layout/loadingPage";
import { Logo } from "@/components/logo";
import { useLastAttempt } from "@/src/api/quiz/useLastAttempt"
import { useQuiz } from "@/src/api/quiz/useQuiz";
import { useUser } from "@/src/api/user/useUser";
import { useParams } from "next/navigation";

export default function Page() {
  const { quizId } = useParams();
  const { data, loading } = useLastAttempt(quizId as string);
  const { data: quizData, loading: quizLoading } = useQuiz(quizId as string)
  const { data: userData, loading: userLoading } = useUser();

  const getScoreMessage = (score: number) => {
    if (score === 30) {
      return "Perfeito! Você mandou muito bem 🚀🔥";
    }
    if (score >= 24) {
      return "Excelente desempenho! Você domina esse assunto 👏";
    }
    if (score >= 18) {
      return "Muito bom! Está no caminho certo 😄";
    }
    if (score >= 12) {
      return "Bom resultado, mas ainda dá pra melhorar 💪";
    }
    if (score >= 6) {
      return "Você pode melhorar! Que tal tentar novamente? 📚";
    }
    return "Não desista! Continue estudando e tente outra vez 🌱";
  };

  return (
    <div className="layoutDiv">
      {loading || quizLoading || userLoading || !userData || !quizData || !data ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <Logo width={40} />
            <p className="text-base md:text-lg font-bold -mb-1 text-main-60">DevOrganiza</p>
          </div>
          <p className="text-lg md:text-xl">Parabéns, {userData.user.name}!</p>
          <p className="text-gray-50">Você completou o quiz de {quizData.title}</p>
          <div className="flex justify-center items-center my-6 w-28 h-28 border-12 border-main-30 rounded-full text-3xl font-bold">
            {data.score}
          </div>
          {data.score !== undefined && (
            <div className="text-center">
              <p>
                Você acertou <span className="font-bold">{data.score}</span> de 30 perguntas!
              </p>
              <p className="mt-2 text-main-40 font-medium">
                {getScoreMessage(data.score)}
              </p>
            </div>
          )}
          <Button className="mt-6" href={`/quizzes/${quizId}`}>Tentar novamente</Button>
        </div>
      )}
    </div>
  )
}