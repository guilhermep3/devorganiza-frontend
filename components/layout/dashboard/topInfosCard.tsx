import { LucideProps } from "lucide-react"
import { ReactNode } from "react";

type props = {
  title: string;
  Icon: LucideProps;
  data: string | ReactNode;
  content?: ReactNode;
}
export const TopInfosCard = ({ title, Icon, data, content }: props) => {

  return (
    <div className="group flex flex-col gap-3 bg-card p-3 md:p-4 rounded-md border border-gray-20 hover:border-main-20 transition">
      <div className="flex items-center gap-2 md:gap-3 text-sm lg:text-base">
        <div className="flex h-12 w-12 items-center justify-center bg-zinc-300/20 dark:bg-black/20
          rounded-xl transition-all duration-300 group-hover:bg-zinc-400/20"
        >
          {Icon as ReactNode}
        </div>
        {title}
      </div>
      <div className="font-bold text-2xl mt-auto">
        {data}
        {content}
      </div>
    </div>
  )
}