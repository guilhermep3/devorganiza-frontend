import { CircleQuestionMark, ListCheck, ListChecks, ListX, Loader2 } from "lucide-react"
import { TopInfosCard } from "./topInfosCard"
import { StudyTask } from "@/src/types/study"
import { Quiz } from "@/src/types/quiz"

type props = {
  studiesData: StudyTask[] | null
  quizzesData: Quiz[] | null
  quizzesLockData: Quiz[] | null
}

export const TopInfos = ({ studiesData, quizzesData, quizzesLockData }: props) => {
  const isLoading = !studiesData || !quizzesData || !quizzesLockData;

  const allTasks = studiesData?.flatMap(i => i.tasks) ?? [];
  const totalTasks = allTasks.length;
  const totalFinished = allTasks.filter(t => t.done === true).length;
  const totalPendent = allTasks.filter(t => t.done === false).length;

  const totalQuizzes = quizzesData ? quizzesData.length : 0;
  const totalQuizzesLock = quizzesLockData ? quizzesLockData.length + totalQuizzes : 0;

  return (
    <section className="flex flex-col">
      <h1 className="dashboardSectionTitle">Bem vindo de volta, Nome do Usuário!</h1>
      <h2 className="dashboardSectionSubtitle">Organize seus estudos e veja os dados do seu desempenho</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <TopInfosCard
          title="Total de tarefas"
          Icon={<ListChecks className="min-w-fit! w-5 h-5 md:w-7 md:h-7 text-main-30" />}
          data={isLoading ? 0 : totalTasks}
        />
        <TopInfosCard
          title="Tarefas finalizadas"
          Icon={<ListCheck className="min-w-fit! w-5 h-5 md:w-7 md:h-7 text-green-600" />}
          data={isLoading ? 0 : totalFinished}
        />
        <TopInfosCard
          title="Tarefas pendentes"
          Icon={<ListX className="min-w-fit! w-5 h-5 md:w-7 md:h-7 text-red-600" />}
          data={isLoading ? 0 : totalPendent}
        />
        <TopInfosCard
          title="Quizzes desbloqueados"
          Icon={<CircleQuestionMark className="min-w-fit! w-5 h-5 md:w-7 md:h-7 text-main-30" />}
          data={
            isLoading
              ? 0
              : `${totalQuizzes} de ${totalQuizzesLock}`
          }
        />
      </div>
    </section>
  )
}
