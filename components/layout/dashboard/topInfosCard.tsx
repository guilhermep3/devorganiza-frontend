import { LucideProps } from "lucide-react"
import { ReactNode } from "react";

type props = {
  title: string;
  Icon: LucideProps;
  data: string;
}
export const TopInfosCard = ({ title, Icon, data }: props) => {

  return (
    <div className="flex flex-col gap-3 bg-card p-4 rounded-md border border-gray-20 hover:border-main-20 transition">
      <div className="flex items-center gap-3 text-sm lg:text-base">
        {Icon as ReactNode}
        {title}
      </div>
      <div className="font-bold text-2xl mt-auto">
        {data}
      </div>
    </div>
  )
}