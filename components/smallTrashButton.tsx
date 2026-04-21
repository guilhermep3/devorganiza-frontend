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
      className={`flex items-center justify-center
        w-7 h-7 rounded-full bg-card border border-gray-20 dark:border-gray-30
        text-destructive hover:text-red-500 hover:border-destructive hover:bg-destructive/25
        opacity-0 group-hover:opacity-100 transition-all shadow-sm cursor-pointer ${className}`}
      title="Deletar bloco"
    >
      <Trash2 className="w-3 h-3" />
    </button>
  )
}