import { CircleQuestionMark, ListCheck, ListChecks, ListX } from "lucide-react"
import { TopInfosCard } from "./topInfosCard"
import { StudyTask } from "@/src/types/study"
import { Quiz } from "@/src/types/quiz"

type props = {
  studiesData: StudyTask[] | null
  quizzesData: Quiz[] | null
  quizzesLockData: Quiz[] | null
}
export const TopInfos = ({ studiesData, quizzesData, quizzesLockData }: props) => {
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TopInfosCard
          title="Total de tarefas"
          Icon={<ListChecks className="min-w-fit! text-main-30" />}
          data={totalTasks}
        />
        <TopInfosCard
          title="Tarefas finalizadas"
          Icon={<ListCheck className="min-w-fit! text-green-600" />}
          data={totalFinished}
        />
        <TopInfosCard
          title="Tarefas pendentes"
          Icon={<ListX className="min-w-fit! text-red-600" />}
          data={totalPendent}
        />
        <TopInfosCard
          title="Quizzes desbloqueados"
          Icon={<CircleQuestionMark className="min-w-fit! text-main-30" />}
          data={`${totalQuizzes} de ${totalQuizzesLock}`}
        />
      </div>
    </section>
  )
}