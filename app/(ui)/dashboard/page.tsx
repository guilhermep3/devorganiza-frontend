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

export default function Page() {
  const { data: weeklyProductivityData, loading: weeklyProductivityLoading } = useWeeklyProductivity();
  const { data: tasksByTypeData, loading: tasksByTypeLoading } = useTasksByType();
  const { data: finishedTasksData, loading: finishedTasksLoading } = useFinishedTasksByMonth();
  const { data: averageTimeData, loading: averageTimeLoading } = useAverageTimeFinishTasksChart();
  const { data: averageScoreData, loading: averageScoreLoading } = useAverageScore();
  const { data: fasterAttemptsData, loading: fasterAttemptsLoading } = useFasterAttempts();

  const { data: studiesData, loading: studiesLoading } = useStudies();
  const { data: quizzesData, loading: quizzesLoading } = useQuizzes();
  const { data: quizzesLockData, loading: quizzesLockLoading } = useQuizzesLocked();

  const isMainDataLoading = weeklyProductivityLoading ||
    tasksByTypeLoading ||
    finishedTasksLoading ||
    averageTimeLoading ||
    studiesLoading ||
    quizzesLoading;

  const isQuizzesDataLoading = averageScoreLoading ||
    fasterAttemptsLoading ||
    quizzesLockLoading;

  return (
    <div className="layoutDiv">
      {(studiesLoading || quizzesLoading || quizzesLockLoading) ? (
        <TopInfosSkeleton />
      ) : (
        <TopInfos
          studiesData={studiesData}
          quizzesData={quizzesData}
          quizzesLockData={quizzesLockData}
        />
      )}
      <section className="flex flex-col mb-8">
        <h1 className="dashboardSectionTitle">Dados dos seus estudos</h1>
        <h2 className="dashboardSectionSubtitle">Acompanhe seu desempenho e evolução</h2>
        {isMainDataLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <ChartLoading key={`study-loading-${index}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeklyProductivityData && weeklyProductivityData.length > 0 ? (
              <WeeklyProductivity data={weeklyProductivityData} />
            ) : (
              <div className="p-6 border rounded-lg bg-card flex items-center justify-center min-h-[300px]">
                <p className="text-gray-50 text-center">
                  Nenhum dado de produtividade semanal disponível
                </p>
              </div>
            )}
            {tasksByTypeData && tasksByTypeData.length > 0 ? (
              <TasksByType data={tasksByTypeData} />
            ) : (
              <div className="p-6 border rounded-lg bg-card flex items-center justify-center min-h-[300px]">
                <p className="text-gray-50 text-center">
                  Nenhum dado de tarefas por tipo disponível
                </p>
              </div>
            )}
            {finishedTasksData && finishedTasksData.length > 0 ? (
              <FinishedTasksByMonthChart data={finishedTasksData} />
            ) : (
              <div className="p-6 border rounded-lg bg-card flex items-center justify-center min-h-[300px]">
                <p className="text-gray-50 text-center">
                  Nenhum dado de tarefas finalizadas por mês disponível
                </p>
              </div>
            )}
            {averageTimeData && averageTimeData.length > 0 ? (
              <AverageTimeFinishTaskChart data={averageTimeData} />
            ) : (
              <div className="p-6 border rounded-lg bg-card flex items-center justify-center min-h-[300px]">
                <p className="text-gray-50 text-center">
                  Nenhum dado de tempo médio de conclusão disponível
                </p>
              </div>
            )}
          </div>
        )}
      </section>
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Dados dos quizzes</h1>
        <h2 className="dashboardSectionSubtitle">Acompanhe seu desempenho em tentativas dos quizzes</h2>
        {isQuizzesDataLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, index) => (
              <ChartLoading key={`quiz-loading-${index}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {averageScoreData && averageScoreData.length > 0 ? (
              <QuizAverageScoreChart data={averageScoreData} />
            ) : (
              <div className="p-6 border rounded-lg bg-card flex items-center justify-center min-h-[300px]">
                <p className="text-gray-50 text-center">
                  Nenhum dado de pontuação média disponível
                </p>
              </div>
            )}
            {fasterAttemptsData && fasterAttemptsData.length > 0 ? (
              <QuizFasterAttemptsChart data={fasterAttemptsData} />
            ) : (
              <div className="p-6 border rounded-lg bg-card flex items-center justify-center min-h-[300px]">
                <p className="text-gray-50 text-center">
                  Nenhum dado de tentativas rápidas disponível
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}