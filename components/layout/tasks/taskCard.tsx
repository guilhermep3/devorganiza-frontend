"use client"
import { Task } from "@/src/types/study";
import { Pencil, Trash } from "lucide-react";

type Props = {
  task: Task;
  setTaskId: (newV: string) => void;
  setIsEditingTask: (newV: any) => void;
  setIsDeletingTask: (newV: any) => void;
};

export const TaskCard = ({ task, setTaskId, setIsEditingTask, setIsDeletingTask }: Props) => {
  const dateFormated = new Date(task.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return (
    <div className={`bg-card rounded-lg overflow-hidden border flex flex-col transition-colors
      ${task.done
        ? "border-secondary-20/50"
        : "border-amber-400/75 dark:border-amber-400/50"
      }`}
    >
      <div className="px-4 pt-3.5 pb-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-sm text-foreground">{task.title}</h3>
          <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full
            whitespace-nowrap shrink-0
            ${task.done
              ? "bg-secondary-10/50 text-secondary-30"
              : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full
              ${task.done ? "bg-secondary-20" : "bg-amber-400"}`}
            />
            {task.done ? "Concluída" : "Pendente"}
          </span>
        </div>
        {task.link && (
          <a href={task.link} target="_blank" className="ds-link mt-1">
            {task.link.length > 60 ? task.link.slice(0, 60) + "..." : task.link}
          </a>
        )}
      </div>
      <div className="px-4 py-2 border-t border-border flex items-center justify-between mt-auto">
        <span className="text-xs text-foreground bg-muted border border-border rounded px-2 py-0.5">
          {dateFormated}
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => { setIsEditingTask(true); setTaskId(task.id); }}
            className="flex items-center justify-center w-7 h-7 rounded-md border border-border
            text-foreground hover:bg-muted transition cursor-pointer"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => { setIsDeletingTask(true); setTaskId(task.id); }}
            className="flex items-center justify-center w-7 h-7 rounded-md border border-border
            text-red-600 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950 dark:hover:border-red-800 transition cursor-pointer"
          >
            <Trash size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};