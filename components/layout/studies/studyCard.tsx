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
    const isDone = percentage === 100;

    return { total, completed, percentage, isDone }
  }

  const { total, completed, percentage, isDone } = getTasksStats();

  return (
    <div className={`flex flex-col bg-card rounded-lg overflow-hidden border transition-colors
      ${isDone ? "border-secondary-20/50" : "border-amber-400/75 dark:border-amber-400/50"}`}
    >
      <div className="px-5 pt-4 pb-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-base truncate max-w-[70%]">
            {data.study.name}
          </h3>
          <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap
              ${isDone
              ? "bg-secondary-10/50 text-secondary-30"
              : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full
                ${isDone ? "bg-secondary-20" : "bg-amber-400"}
              `}
            />
            {isDone ? "Concluída" : "Pendente"}
          </span>
        </div>
        <span className="inline-block text-xs text-muted-foreground bg-muted border border-border rounded px-2 py-0.5 mb-2">
          {data.study.type || "Sem tipo"}
        </span>
        {data.study.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
            {data.study.description}
          </p>
        )}
        {data.study.link && (
          <a href={data.study.link} target="_blank"
            className="ds-link"
          >
            {data.study.link.length > 100 ? data.study.link.slice(0, 100) + "..." : data.study.link}
          </a>
        )}
      </div>
      <div className="px-5 pb-4 pt-3 flex flex-col gap-3 border-t border-border mt-2 flex-1">
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-muted-foreground">Progresso</span>
            <span className="text-xs font-medium">{percentage}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
            <div
              className={`h-full rounded-full transition-all duration-300
                ${isDone ? "bg-secondary-20" : "bg-amber-400"}
              `}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted rounded-md p-2 flex flex-col items-center gap-0.5">
            <span className="text-lg font-medium leading-none">{total}</span>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <div className="bg-muted rounded-md p-2 flex flex-col items-center gap-0.5">
            <span className="text-lg font-medium leading-none text-teal-600 dark:text-teal-400">
              {completed}
            </span>
            <span className="text-xs text-muted-foreground">Concluídas</span>
          </div>
        </div>
        <Button className="w-full text-sm py-1.5!" href={`/estudos/${data.study.id}`}>
          Ver Estudo
        </Button>
      </div>
    </div>
  );
};
