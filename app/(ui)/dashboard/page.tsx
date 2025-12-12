"use client"
import { TasksCompletedByStudyChart } from "@/components/layout/dashboard/chart/tasksCompletedByStudy";
import { StudyCreatedFinishedChart } from "@/components/layout/dashboard/chart/studyCreatedFinished";
import { TasksFinishedMonthChart } from "@/components/layout/dashboard/chart/tasksFinishedMonth";
import { TopInfos } from "@/components/layout/dashboard/topInfos";
import { TasksBySector } from "@/components/layout/dashboard/chart/tasksBySector";
import { QuizAverageScoreChart } from "@/components/layout/dashboard/chart/quizAverageScore";
import { QuizFasterAttemptsChart } from "@/components/layout/dashboard/chart/quizFastertAttempts";
import { useStudies } from "@/src/api/study/useStudies";
import { useQuizzes } from "@/src/api/quiz/useQuizzes";
import { useQuizzesLocked } from "@/src/api/quiz/useQuizzesLocked";

export default function Page() {
  const { data: studiesData, loading, error } = useStudies();
  const { data: quizzesData } = useQuizzes();
  const { data: quizzesLockData } = useQuizzesLocked();
  console.log(studiesData)

  return (
    <div className="layoutDiv">
      <TopInfos
        studiesData={studiesData} quizzesData={quizzesData} quizzesLockData={quizzesLockData}
      />
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Dados dos seus estudos</h1>
        <h2 className="dashboardSectionSubtitle">Acompanhe seu desempenho e evolução</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StudyCreatedFinishedChart />
          <TasksFinishedMonthChart />
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