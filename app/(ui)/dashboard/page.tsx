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
  const { data: weeklyProductivityData, isLoading: weeklyProductivityLoading } = useWeeklyProductivity();
  const { data: tasksByTypeData, isLoading: tasksByTypeLoading } = useTasksByType();
  const { data: finishedTasksData, isLoading: finishedTasksLoading } = useFinishedTasksByMonth();
  const { data: averageTimeData, isLoading: averageTimeLoading } = useAverageTimeFinishTasksChart();
  const { data: averageScoreData, isLoading: averageScoreLoading } = useAverageScore();
  const { data: fasterAttemptsData, isLoading: fasterAttemptsLoading } = useFasterAttempts();
  const { data: userData, isLoading: userLoading, isFetching: isUserFetching } = useUser();

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

  const isTopInfosLoading = studiesLoading || quizzesLoading ||
    quizzesLockLoading || userLoading ||
    isUserFetching;

  const isTopInfosData = !studiesData || !quizzesData || !quizzesLockData || !userData;

  return (
    <div className="layoutDiv">
      {(isTopInfosLoading || isTopInfosData) ? (
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
              <EmptyChart text="produtividade semanal" />
            )}
            {tasksByTypeData && tasksByTypeData.length > 0 ? (
              <TasksByType data={tasksByTypeData} />
            ) : (
              <EmptyChart text="tarefas por tipo" />
            )}
            {finishedTasksData && finishedTasksData.length > 0 ? (
              <FinishedTasksByMonthChart data={finishedTasksData} />
            ) : (
              <EmptyChart text="tarefas finalizadas por mês" />
            )}
            {averageTimeData && averageTimeData.length > 0 ? (
              <AverageTimeFinishTaskChart data={averageTimeData} />
            ) : (
              <EmptyChart text="tempo médio de conclusão" />
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
              <EmptyChart text="pontuação média" />
            )}
            {fasterAttemptsData && fasterAttemptsData.length > 0 ? (
              <QuizFasterAttemptsChart data={fasterAttemptsData} />
            ) : (
              <EmptyChart text="tentativas rápidas" />
            )}
          </div>
        )}
      </section>
    </div>
  )
}