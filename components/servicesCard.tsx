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
      <div
        className="flex flex-col gap-3 p-6 rounded-lg transition hover:shadow-md hover:shadow-gray-30
        hover:bg-gray-10 dark:hover:bg-background"
      >
        <div className="flex items-center gap-5">
          <span className="text-lg">{data.id}.</span>
          <div className="p-3 bg-main-10 rounded-sm">
            <Icon />
          </div>
        </div>
        <p className="text-lg font-semibold">{data.title}</p>
        <p className="text-sm">{data.description}</p>
      </div>
    </motion.div>
  )
}