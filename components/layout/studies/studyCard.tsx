import { Button } from "@/components/button";
import { StudyTask } from "@/src/types/study";
import { CheckCircle, Hourglass, List, ListCheck } from "lucide-react";

type props = {
  data: StudyTask;
}
export const StudyCard = ({ data }: props) => {

  const getTasksStats = () => {
    if (!data.tasks || data.tasks.length === 0 || data.tasks === null) {
      return { total: 0, completed: 0, percentage: 0 };
    }
    const total = data.tasks.length;
    const completed = data.tasks.filter((t) => t.done === true).length;
    const percentage = total === 0 ? 0 : (Math.floor((completed / total) * 100));

    return { total, completed, percentage }
  }
  const { total, completed, percentage } = getTasksStats();

  return (
    <div className={`flex flex-col bg-card h-[300px] sm:h-80 lg:h-[340px] border rounded-md overflow-hidden transition
      ${data.study.status === 'finalizado' ? "border-green-20" : "border-yellow-500"}
    `}>
      <div className="flex flex-col gap-3 h-full border-t border-gray-30 p-2 md:p-3">
        <div className="mb-3">
          <h3 className="font-semibold text-lg truncate">{data.study.name}</h3>
          <div className="flex items-center justify-between gap-1 lg:gap-2 mt-1">
            <span className="text-xs px-2 py-1 bg-main-10 text-main-60 border border-main-20 rounded-sm">
              {data.study.type || 'Sem tipo'}
            </span>
            <div className="flex items-center gap-2">
              {data.study.status === 'finalizado'
                ? <CheckCircle className="text-green-20" />
                : <Hourglass className="text-yellow-500" />
              }
              <div className={`hidden md:flex items-center gap-2 text-xs px-2 py-1 rounded-sm border border-gray-20
              ${data.study.status === 'finalizado'
                  ? 'finishedCustom' : 'pendentCustom'
                }`}
              >
                <p>{data.study.status === 'finalizado' ? "Concluída" : "Pendente"}</p>
              </div>
            </div>
          </div>
          {data.study.description && (
            <p className="text-xs lg:text-sm text-gray-60 mt-2 line-clamp-2">
              {data.study.description}
            </p>
          )}
        </div>
        <div className="mt-auto">
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-60">Progresso</span>
              <span className="text-sm font-bold">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-20 rounded-full h-3 border border-gray-20">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 md:gap-2 text-center">
            <div className="p-1 md:p-2 rounded bg-gray-20">
              <div className="flex items-center justify-center gap-1 text-foreground">
                <List className="w-4 h-4" />
                <span className="font-bold">{total}</span>
              </div>
              <span className="text-xs text-gray-50">Total</span>
            </div>
            <div className="p-1 md:p-2 rounded bg-green-100 dark:bg-green-950">
              <div className="flex items-center justify-center gap-1 text-green-20">
                <ListCheck className="w-4 h-4" />
                <span className="font-bold">{completed}</span>
              </div>
              <span className="text-xs text-gray-50">Concluídas</span>
            </div>
          </div>
        </div>
        <Button
          className="w-full text-sm md:text-base py-1.5!"
          href={`/studies/${data.study.id}`}
        >
          Ver Estudo
        </Button>
      </div>
    </div>
  );
};
