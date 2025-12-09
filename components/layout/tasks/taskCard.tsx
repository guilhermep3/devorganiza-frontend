"use client"
import { Task } from "@/src/types/study";
import { CheckCircle, Hourglass, Pencil, Trash } from "lucide-react";

type props = {
  task: Task
  setTaskId: (newV: number) => void;
  setIsEditingTask: (newV: any) => void;
  setIsDeletingTask: (newV: any) => void;
}
export const TaskCard = ({ task, setTaskId, setIsEditingTask, setIsDeletingTask }: props) => {

  return (
    <div className={`bg-card p-4 rounded-lg flex flex-col justify-between gap-3 border
      ${task.done ? "border-green-20" : "border-yellow-500"}`}
    >
      <div>
        <h3 className="text-foreground font-semibold mb-1">{task.title}</h3>
        {task.link && (
          <a
            href={task.link}
            target="_blank"
            className="text-sm text-blue-400 break-all"
          >
            {task.link}
          </a>
        )}
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          {task.done
            ? <CheckCircle className=" text-green-900 dark:text-green-200" />
            : <Hourglass className="text-yellow-900 dark:text-yellow-200" />
          }
          <div className={`flex items-center gap-2 text-xs px-2 py-1 rounded-sm border border-gray-20
          ${task.done
              ? 'finishedCustom' : 'pendentCustom'
            }`}
          >
            <p>{task.done ? "Concluída" : "Pendente"}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => { setIsEditingTask(true), setTaskId(task.id) }}
            className="text-gray-60 hover:text-foreground transition cursor-pointer"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => { setIsDeletingTask(true), setTaskId(task.id) }}
            className="text-red-500 hover:text-red-600 transition cursor-pointer"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}