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
import { Task } from "@/src/types/study";
import { useQuizAttempts } from "@/src/api/quiz/useQuizAttempts";

export default function Page() {
  const { data: studiesData } = useStudies();
  const { data: quizzesData } = useQuizzes();
  const { data: quizzesLockData } = useQuizzesLocked();
  const { data: attemptsData } = useQuizAttempts();
  const allTasks = studiesData?.flatMap(i => i.tasks) ?? [];
  console.log("attemptsData", attemptsData)

  const tasksByDayWeek = allTasks.reduce((acc: Record<number, Task[]>, task) => {
    const date = new Date(task.createdAt);
    const dayWeek = date.getDay();

    acc[dayWeek] = acc[dayWeek] || [];
    acc[dayWeek].push(task);

    return acc;
  }, {});

  const finishedTasksByMonth = allTasks.reduce((acc: Record<number, Task[]>, task) => {
    const date = new Date(task.createdAt);
    const month = date.getMonth();

    acc[month] = acc[month] || [];
    acc[month].push(task)

    return acc;
  }, {});

  const studiesByType = studiesData?.reduce((acc: Record<string, any>, item) => {
    const type = item.study.type as string;
    const tasksCount = item.tasks.length;

    acc[type] = (acc[type] || 0) + tasksCount;

    return acc;
  }, {})

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
          <WeeklyProductivity data={tasksByDayWeek} />
          <TasksByType data={studiesByType} />
          <FinishedTasksByMonthChart data={finishedTasksByMonth} />
        </div>
      </section>
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Dados dos quizzes</h1>
        <h2 className="dashboardSectionSubtitle">Acompanhe seu desempenho em tentativas dos quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuizAverageScoreChart data={attemptsByQuiz} />
          <QuizFasterAttemptsChart />
        </div>
      </section>
    </div>
  )
}