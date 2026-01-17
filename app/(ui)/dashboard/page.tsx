"use client"
import { WeeklyProductivity } from "@/components/layout/dashboard/chart/weeklyProductivity";
import { FinishedTasksByMonthChart } from "@/components/layout/dashboard/chart/finishedTasksByMonth";
import { TopInfos } from "@/components/layout/dashboard/topInfos";
import { TasksByType } from "@/components/layout/dashboard/chart/tasksByType";
import { QuizAverageScoreChart } from "@/components/layout/dashboard/chart/quizAverageScore";
import { QuizFasterAttemptsChart } from "@/components/layout/dashboard/chart/quizFastertAttempts";
import { useStudies } from "@/src/api/study/useStudies";
import { useQuizzes } from "@/src/api/quiz/useQuizzes";
import { useQuizzesLocked } from "@/src/api/quiz/useQuizzesLocked";
import { useFasterAttempts } from "@/src/api/chart/useFasterAttempts";
import { useWeeklyProductivity } from "@/src/api/chart/useWeeklyProductivity";
import { useTasksByType } from "@/src/api/chart/useTasksByType";
import { useFinishedTasksByMonth } from "@/src/api/chart/useFinishedTasks";
import { AverageTimeFinishTaskChart } from "@/components/layout/dashboard/chart/averageTimeFinishTask";
import { useAverageTimeFinishTasksChart } from "@/src/api/chart/useAverageTimeFinishTasks";
import { useAverageScore } from "@/src/api/chart/useAverageScore";
import { ChartLoading } from "@/components/layout/dashboard/chart/chartLoading";
import { TopInfosSkeleton } from "@/components/layout/dashboard/topInfosSkeleton";
import { useUser } from "@/src/api/user/useUser";
import { EmptyChart } from "@/components/layout/dashboard/chart/emptyChart";

export default function Page() {

  const weeklyProductivity = useWeeklyProductivity();
  const tasksByType = useTasksByType();
  const finishedTasks = useFinishedTasksByMonth();
  const averageTime = useAverageTimeFinishTasksChart();
  const averageScore = useAverageScore();
  const fasterAttempts = useFasterAttempts();

  const { data: userData } = useUser();
  const { data: studiesData } = useStudies();
  const { data: quizzesData } = useQuizzes();
  const { data: quizzesLockData } = useQuizzesLocked();

  const hasTopInfosData = !!userData && !!studiesData &&
    !!quizzesData && !!quizzesLockData;

  const hasStudiesData = !!weeklyProductivity.data && !!tasksByType.data &&
    !!finishedTasks.data && !!averageTime.data;

  const hasQuizzesData = !!averageScore.data && !!fasterAttempts.data;

  return (
    <div className="layoutDiv">
      {!hasTopInfosData ? (
        <TopInfosSkeleton />
      ) : (
        <TopInfos
          userData={userData}
          studiesData={studiesData}
          quizzesData={quizzesData}
          quizzesLockData={quizzesLockData}
        />
      )}
      <section className="flex flex-col mb-8">
        <h1 className="dashboardSectionTitle">Dados dos seus estudos</h1>
        <h2 className="dashboardSectionSubtitle">
          Acompanhe seu desempenho e evolução
        </h2>

        {!hasStudiesData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <ChartLoading key={`study-loading-${index}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeklyProductivity.data.length ? (
              <WeeklyProductivity data={weeklyProductivity.data} />
            ) : (
              <EmptyChart text="produtividade semanal" />
            )}
            {tasksByType.data.length ? (
              <TasksByType data={tasksByType.data} />
            ) : (
              <EmptyChart text="tarefas por tipo" />
            )}
            {finishedTasks.data.length ? (
              <FinishedTasksByMonthChart data={finishedTasks.data} />
            ) : (
              <EmptyChart text="tarefas finalizadas por mês" />
            )}
            {averageTime.data.length ? (
              <AverageTimeFinishTaskChart data={averageTime.data} />
            ) : (
              <EmptyChart text="tempo médio de conclusão" />
            )}
          </div>
        )}
      </section>
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
    </div>
  )
}