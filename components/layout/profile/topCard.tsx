import { Loader2, LucideIcon, LucideProps } from "lucide-react";

type props = {
  title: string;
  Icon: LucideIcon,
  data: number
}
export const TopCard = ({ title, Icon, data }: props) => {

  return (
    <div className="flex flex-col gap-3 p-3 lg:p-4 bg-card border border-gray-20 rounded-md">
      <div className="flex items-center gap-2 text-sm xl:text-base">
        <Icon className="text-main-30" />
        {title}
      </div>
      <div className="font-bold text-xl lg:text-3xl">
        {Number.isInteger(data) ? data : data.toFixed(2) ?? <Loader2 className="w-5 h-5 animate-spin" />}
      </div>
    </div>
  )
}