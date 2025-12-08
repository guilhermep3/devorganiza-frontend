import { Task } from "@/src/types/study"
import { Pencil, Trash } from "lucide-react"

export const TaskItem = ({ task }: { task: Task }) => {

  return (
    <div className="bg-card p-4 rounded-lg flex flex-col justify-between gap-3">
      <div>
        <h3 className="text-foreground font-semibold">{task.title}</h3>
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
      <div className="flex justify-between items-center">
        <span className={`text-xs ${task.done ? "text-green-600" : "text-yellow-600"}`}>
          {task.done ? "Concluída" : "Pendente"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => console.log("Editar task", task.id)}
            className="text-gray-50 hover:text-gray-60 transition cursor-pointer"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => console.log("Excluir task", task.id)}
            className="text-red-500 hover:text-red-600 transition cursor-pointer"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}