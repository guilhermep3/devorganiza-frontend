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
  const { data, isLoading } = useLastAttempt(quizId as string);
  const { data: quizData, isLoading: quizLoading } = useQuiz(quizId as string)
  const { data: userData, isLoading: userLoading } = useUser();

  const getScoreMessage = (score: number) => {
    if (score === 30) {
      return "Perfeito! Você acertou todas! 🚀🔥";
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

  const getScoreColor = (score: number) => {
    if (score === 30) {
      return 'text-green-600';
    }
    if (score >= 18) {
      return 'text-main-30';
    }
    if (score >= 12) {
      return 'text-yellow-700 dark:text-yellow-600';
    }
    return 'text-orange-600 dark:text-orange-500';
  };

  function getTimeFormatted(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = minutes % 60;

    return `${minutes} min e ${seconds} seg`
  }

  return (
    <div className="layoutDiv">
      {isLoading || quizLoading || userLoading || !userData || !quizData || !data ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <Logo width={40} />
            <p className="text-base md:text-lg font-bold -mb-1 text-main-60">DevOrganiza</p>
          </div>
          <p className="text-lg md:text-xl">Parabéns, {userData.user.name}!</p>
          <p className="text-gray-50">Você completou o quiz de {quizData.title}</p>
          <div className="flex justify-center items-center my-6 w-28 h-28 border-12 border-main-30 rounded-full text-4xl font-bold">
            {data.score}
          </div>
          {data.score !== undefined && (
            <div className="flex flex-col gap-4 text-center">
              <p>Você acertou <strong>{data.score}</strong> de 30 perguntas!</p>
              <p>Tempo levado: <strong>{getTimeFormatted(data.durationSec)}</strong></p>
              <p className={`font-medium ${getScoreColor(data.score)}`}>
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