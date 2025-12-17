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
import { useQuizAttempts } from "@/src/api/quiz/useQuizAttempts";
import { useFasterAttempts } from "@/src/api/chart/useFasterAttempts";
import { useWeeklyProductivity } from "@/src/api/chart/useWeeklyProductivity";
import { useTasksByType } from "@/src/api/chart/useTasksByType";
import { useFinishedTasksByMonth } from "@/src/api/chart/useFinishedTasks";
import { AverageTimeFinishTaskChart } from "@/components/layout/dashboard/chart/averageTimeFinishTask";
import { useAverageTimeFinishTasksChart } from "@/src/api/chart/useAverageTimeFinishTasks";
import { useAverageScore } from "@/src/api/chart/useAverageScore";

export default function Page() {
  const { data: weeklyProductivityData, loading: weeklyProductivityLoading } = useWeeklyProductivity();
  const { data: tasksByTypeData, loading: tasksByTypeLoading } = useTasksByType();
  const { data: finishedTasksData, loading: finishedTasksLoading } = useFinishedTasksByMonth();
  const { data: averageTimeData, loading: averageTimeLoading } = useAverageTimeFinishTasksChart();
  const { data: averageScoreData, loading: AverageScoreLoading } = useAverageScore();
  const { data: fasterAttemptsData, loading: fasterAttemptsLoading } = useFasterAttempts();

  const { data: studiesData } = useStudies();
  const { data: quizzesData } = useQuizzes();
  const { data: quizzesLockData } = useQuizzesLocked();
  const { data: attemptsData } = useQuizAttempts();

  const attemptsByQuiz = attemptsData?.reduce((acc, attempt) => {
    const quizTitle = attempt.quizTitle

    if (!acc[quizTitle]) {
      acc[quizTitle] = {
        totalScore: 0,
        count: 0,
        averageScore: 0,
      }
    }

    acc[quizTitle].totalScore += attempt.score;
    acc[quizTitle].count += 1;
    acc[quizTitle].averageScore = acc[quizTitle].totalScore / acc[quizTitle].count;

    return acc
  }, {} as Record<string, { totalScore: number, count: number, averageScore: number }>)

  return (
    <div className="layoutDiv">
      <TopInfos
        studiesData={studiesData} quizzesData={quizzesData} quizzesLockData={quizzesLockData}
      />
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Dados dos seus estudos</h1>
        <h2 className="dashboardSectionSubtitle">Acompanhe seu desempenho e evolução</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!weeklyProductivityLoading && weeklyProductivityData &&
            <WeeklyProductivity data={weeklyProductivityData} />
          }
          {!tasksByTypeLoading && tasksByTypeData &&
            <TasksByType data={tasksByTypeData} />
          }
          {!finishedTasksLoading && finishedTasksData &&
            <FinishedTasksByMonthChart data={finishedTasksData} />
          }
          {!averageTimeLoading && averageTimeData &&
            <AverageTimeFinishTaskChart data={averageTimeData} />
          }
        </div>
      </section>
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Dados dos quizzes</h1>
        <h2 className="dashboardSectionSubtitle">Acompanhe seu desempenho em tentativas dos quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!AverageScoreLoading && averageScoreData &&
            <QuizAverageScoreChart data={averageScoreData} />
          }
          {!fasterAttemptsLoading && fasterAttemptsData &&
            <QuizFasterAttemptsChart data={fasterAttemptsData} />
          }
        </div>
      </section>
    </div>
  )
}