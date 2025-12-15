"use client"
import { WeeklyProductivity } from "@/components/layout/dashboard/chart/weeklyProductivity";
import { FinishedTasksByMonthChart } from "@/components/layout/dashboard/chart/finishedTasksByMonth";
import { TasksCompletedByStudyChart } from "@/components/layout/dashboard/chart/tasksCompletedByStudy";
import { TopInfos } from "@/components/layout/dashboard/topInfos";
import { TasksBySector } from "@/components/layout/dashboard/chart/tasksBySector";
import { QuizAverageScoreChart } from "@/components/layout/dashboard/chart/quizAverageScore";
import { QuizFasterAttemptsChart } from "@/components/layout/dashboard/chart/quizFastertAttempts";
import { useStudies } from "@/src/api/study/useStudies";
import { useQuizzes } from "@/src/api/quiz/useQuizzes";
import { useQuizzesLocked } from "@/src/api/quiz/useQuizzesLocked";
import { Task } from "@/src/types/study";

export default function Page() {
  const { data: studiesData } = useStudies();
  const { data: quizzesData } = useQuizzes();
  const { data: quizzesLockData } = useQuizzesLocked();
  const allTasks = studiesData?.flatMap(i => i.tasks) ?? [];
  console.log("allTasks", allTasks)

  const tasksByDayWeek = allTasks.reduce((acc: Record<number, Task[]>, task) => {
    const date = new Date(task.createdAt);
    const dayWeek = date.getDay();

    acc[dayWeek] = acc[dayWeek] || [];
    acc[dayWeek].push(task);

    return acc;
  }, {});
  console.log("tasksByDayWeek", tasksByDayWeek)

  const finishedTasksByMonth = allTasks.reduce((acc: Record<number, Task[]>, task) => {
    const date = new Date(task.createdAt);
    const month = date.getMonth();

    acc[month] = acc[month] || [];
    acc[month].push(task)

    return acc;
  }, {})
  console.log("finishedTasksByMonth", finishedTasksByMonth)

  return (
    <div className="layoutDiv">
      <TopInfos
        studiesData={studiesData} quizzesData={quizzesData} quizzesLockData={quizzesLockData}
      />
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Dados dos seus estudos</h1>
        <h2 className="dashboardSectionSubtitle">Acompanhe seu desempenho e evolução</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeeklyProductivity data={tasksByDayWeek} />
          <FinishedTasksByMonthChart data={finishedTasksByMonth} />
          <TasksCompletedByStudyChart />
          <TasksBySector />
        </div>
      </section>
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Dados dos quizzes</h1>
        <h2 className="dashboardSectionSubtitle">Acompanhe seu desempenho em tentativas dos quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuizAverageScoreChart />
          <QuizFasterAttemptsChart />
        </div>
      </section>
    </div>
  )
}