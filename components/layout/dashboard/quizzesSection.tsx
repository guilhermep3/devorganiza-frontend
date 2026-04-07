import { useAverageScore } from "@/src/api/chart/useAverageScore"
import { ChartLoading } from "./chart/chartLoading"
import { EmptyChart } from "./chart/emptyChart"
import { QuizAverageScoreChart } from "./chart/quizAverageScore"
import { QuizFasterAttemptsChart } from "./chart/quizFastertAttempts"
import { useFasterAttempts } from "@/src/api/chart/useFasterAttempts"

export const DashboardQuizzesSection = () => {
  const averageScore = useAverageScore();
  const fasterAttempts = useFasterAttempts();

  const hasQuizzesData = !!averageScore.data && !!fasterAttempts.data;

  return (
    <section className="flex flex-col">
      <h1 className="dashboardSectionTitle">Dados dos quizzes</h1>
      <h2 className="dashboardSectionSubtitle">
        Acompanhe seu desempenho em tentativas dos quizzes
      </h2>
      {!hasQuizzesData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, index) => (
            <ChartLoading key={`quiz-loading-${index}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {averageScore.data.length ? (
            <QuizAverageScoreChart data={averageScore.data} />
          ) : (
            <EmptyChart text="pontuação média" />
          )}

          {fasterAttempts.data.length ? (
            <QuizFasterAttemptsChart data={fasterAttempts.data} />
          ) : (
            <EmptyChart text="tentativas rápidas" />
          )}
        </div>
      )}
    </section>
  )
}