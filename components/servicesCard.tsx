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
      <div className="group flex flex-col gap-3 p-6 rounded-lg transition border border-zinc-100 hover:border-gray-20
        hover:shadow-md hover:shadow-gray-30 dark:hover:shadow-black"
      >
        <div className="flex items-center gap-5">
          <div className="p-3 bg-main-20/50 group-hover:bg-main-20 group-hover:scale-110 group-hover:rotate-12
            rounded-xl transition-all"
          >
            <Icon />
          </div>
        </div>
        <p className="text-lg md:text-xl font-semibold">{data.title}</p>
        <p className="text-sm">{data.description}</p>
      </div>
    </motion.div>
  )
}