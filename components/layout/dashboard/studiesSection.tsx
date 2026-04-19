import { useWeeklyProductivity } from "@/src/api/chart/useWeeklyProductivity";
import { useTasksByType } from "@/src/api/chart/useTasksByType";
import { useFinishedTasksByMonth } from "@/src/api/chart/useFinishedTasks";
import { useAverageTimeFinishTasksChart } from "@/src/api/chart/useAverageTimeFinishTasks";
import { AverageTimeFinishTaskChart } from "./chart/averageTimeFinishTask"
import { ChartLoading } from "./chart/chartLoading"
import { EmptyChart } from "./chart/emptyChart"
import { FinishedTasksByMonthChart } from "./chart/finishedTasksByMonth"
import { TasksByType } from "./chart/tasksByType"
import { WeeklyProductivity } from "./chart/weeklyProductivity"

export const DashboardStudiesSection = () => {
  const weeklyProductivity = useWeeklyProductivity();
  const tasksByType = useTasksByType();
  const finishedTasks = useFinishedTasksByMonth();
  const averageTime = useAverageTimeFinishTasksChart();

  const hasStudiesData = !!weeklyProductivity.data && !!tasksByType.data &&
    !!finishedTasks.data && !!averageTime.data;

  return (
    <section className="flex flex-col mb-8">
      <h1 className="ds-text-2xl-bold">Dados dos seus estudos</h1>
      <h2 className="ds-text-subtitle">
        Acompanhe seu desempenho e evolução
      </h2>
      {!hasStudiesData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <ChartLoading key={`study-loading-${index}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyProductivity.data.length ? (
            <WeeklyProductivity data={weeklyProductivity.data} />
          ) : (
            <EmptyChart text="produtividade semanal" />
          )}
          {tasksByType.data.length ? (
            <TasksByType data={tasksByType.data} />
          ) : (
            <EmptyChart text="tarefas por tipo" />
          )}
          {finishedTasks.data.length ? (
            <FinishedTasksByMonthChart data={finishedTasks.data} />
          ) : (
            <EmptyChart text="tarefas finalizadas por mês" />
          )}
          {averageTime.data.length ? (
            <AverageTimeFinishTaskChart data={averageTime.data} />
          ) : (
            <EmptyChart text="tempo médio de conclusão" />
          )}
        </div>
      )}
    </section>
  )
}