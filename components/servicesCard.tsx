import { ServicesData } from "@/src/data/services";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react"

type props = {
  data: ServicesData;
  Icon: LucideIcon
}
export const ServicesCard = ({ data, Icon }: props) => {

  return (
    <motion.div
      initial={{ scale: 0.3 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
    >
      <div className="group relative flex flex-col gap-3 p-5 bg-card
        rounded-lg transition duration-200 border border-main-10 hover:border-main-40/50
        hover:-translate-y-2 hover:shadow-gray-30 dark:hover:shadow-gray-10
        hover:shadow-[0_12px_40px_-4px_rgba(0,183,255,0.3)]"
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
          pointer-events-none bg-linear-to-br from-main-40/10 via-transparent to-main-40/10"
        />
        <div className="flex items-center gap-5">
          <div className="p-3 bg-main-40/10 text-main-30 rounded-xl transition-all
            group-hover:bg-main-40/20 group-hover:scale-110 group-hover:rotate-12"
          >
            <Icon />
          </div>
        </div>
        <p className="text-lg md:text-xl font-semibold">{data.title}</p>
        <p className="text-sm text-gray-70">{data.description}</p>
      </div>
    </motion.div>
  )
}