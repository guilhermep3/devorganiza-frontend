import { CircleQuestionMark, ListCheck, ListChecks, ListX } from "lucide-react"
import { TopInfosCard } from "./topInfosCard"

export const TopInfos = () => {

  return (
    <section className="flex flex-col">
      <h1 className="dashboardSectionTitle">Bem vindo de volta, Nome do Usuário!</h1>
      <h2 className="dashboardSectionSubtitle">Organize seus estudos e veja os dados do seu desempenho</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TopInfosCard
          title="Total de tarefas"
          Icon={<ListChecks className="min-w-fit! text-main-30" />}
          data="250"
        />
        <TopInfosCard
          title="Tarefas finalizadas"
          Icon={<ListCheck className="min-w-fit! text-green-600" />}
          data="200"
        />
        <TopInfosCard
          title="Tarefas pendentes"
          Icon={<ListX className="min-w-fit! text-red-600" />}
          data="50"
        />
        <TopInfosCard
          title="Quizzes desbloqueados"
          Icon={<CircleQuestionMark className="min-w-fit! text-main-30" />}
          data="3 de 10"
        />
      </div>
    </section>
  )
}