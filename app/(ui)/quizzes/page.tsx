"use client"
import { QuizCard } from "@/components/layout/dashboard/quizzes/quizCard";
import { useQuizzesLocked } from "@/src/api/quiz/useQuizzesLocked";
import { useQuizzes } from "@/src/api/quiz/useQuizzes";
import { QuizCardSkeleton } from "@/components/layout/dashboard/quizzes/quizCardSkeleton";

export default function Page() {
  const { data, loading } = useQuizzes();
  const { data: lockData, loading: lockLoading } = useQuizzesLocked();

  const isLoading = loading || lockLoading;
  const hasData = (data && data.length > 0) || (lockData && lockData.length > 0);

  return (
    <div className="layoutDiv">
      <section className="flex flex-col">
        <div>
          <h1 className="dashboardSectionTitle">Quizzes</h1>
          <h2 className="dashboardSectionSubtitle">Pratique com seus quizzes desbloqueados</h2>
        </div>
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <QuizCardSkeleton key={i} />
              ))}
            </div>
          ) : hasData ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
              {data?.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
              {lockData?.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} locked />
              ))}
            </div>
          ) : (
            <div className="text-gray-40 w-full">Nenhum dado encontrado</div>
          )}
        </div>
      </section>
    </div>
  )
}