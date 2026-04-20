import { Trash2 } from "lucide-react";
import { FormEvent } from "react";

type props = {
  className?: string;
  handleClick: (e?: FormEvent) => void;
}
export const SmalllTrashButton = ({ className, handleClick }: props) => {

  return (
    <button
      onClick={handleClick}
      className={`${className} flex items-center justify-center
        w-6 h-6 rounded-full bg-white dark:bg-gray-20 border border-gray-20 dark:border-gray-30
        text-gray-40 hover:text-red-500 hover:border-red-400
        opacity-0 group-hover:opacity-100 transition-all shadow-sm cursor-pointer`}
      title="Deletar bloco"
    >
      <Trash2 className="w-3 h-3" />
    </button>
  )
}