import { motion } from "motion/react";
import { LucideIcon } from "lucide-react"
import { AboutData } from "@/src/data/about";

type props = {
  data: AboutData;
  Icon: LucideIcon
}
export const AboutCard = ({ data, Icon }: props) => {

  return (
    <motion.div
      initial={{ scale: 0.3 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut", }}
    >
      <div className={`group flex flex-col gap-4 p-6 md:p-8 rounded-lg text-white dark:text-black transition
        shadow-lg shadow-gray-20 hover:shadow-gray-30 hover:-translate-y-1
        ${data.id === 1 && 'bg-main-30'}
        ${data.id === 2 && 'bg-green-20'}
        ${data.id === 3 && 'bg-main-40'}
      `}>
        <div className="flex justify-between">
          <p className="text-xl font-bold">
            <span className="mr-2">{data.id}.</span> {data.title}
          </p>
          <Icon className="transition-all duration-200 group-hover:scale-125" />
        </div>
        <p>{data.description}</p>
      </div>
    </motion.div>
  )
}