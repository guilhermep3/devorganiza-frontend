"use client"
import { QuizCard } from "@/components/layout/dashboard/quizzes/quizCard";
import { useQuizzesLocked } from "@/src/api/quiz/useQuizzesLocked";
import { useQuizzes } from "@/src/api/quiz/useQuizzes";
import { QuizCardSkeleton } from "@/components/layout/dashboard/quizzes/quizCardSkeleton";

export default function Page() {
  const { data, loading } = useQuizzes();
  const { data: lockData, loading: lockLoading } = useQuizzesLocked();

  return (
    <div className="layoutDiv">
      <section className="flex flex-col">
        <div>
          <h1 className="dashboardSectionTitle">Quizzes</h1>
          <h2 className="dashboardSectionSubtitle">Pratique com seus quizzes desbloqueados</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {loading || !data ? (
            <QuizCardSkeleton />
          ) : data.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
          {lockLoading || !lockData ? (
            <QuizCardSkeleton />
          ) : lockData.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} locked />
          ))}
        </div>
      </section>
    </div>
  )
}