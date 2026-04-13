import { LucideIcon } from "lucide-react";

type props = {
  Icon: LucideIcon,
  title: string,
  description: string
}
export const AuthFeatureCard = ({ Icon, title, description }: props) => {

  return (
    <div className="group flex items-start gap-4 p-4 rounded-xl bg-white/10 border border-white/10
      backdrop-blur-sm hover:bg-white/15 transition-all"
    >
      <div className="p-2 rounded-lg bg-white/20 text-white
        group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
      >
        <Icon />
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-main-10 dark:text-main-70 opacity-80">{description}</p>
      </div>
    </div>
  );
}