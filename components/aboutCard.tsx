import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { AboutData } from "@/src/data/about";

type Props = {
  data: AboutData;
  Icon: LucideIcon;
};

export const AboutCard = ({ data, Icon }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className={` group relative flex flex-col gap-4 p-6 md:p-8 rounded-2xl transition-all duration-300
          shadow-md hover:shadow-xl hover:-translate-y-2 text-white

          ${data.id === 1 && "bg-main-30"}
          ${data.id === 2 && "bg-green-20"}
          ${data.id === 3 && "bg-main-30"}
        `}
      >
        <div className="flex items-center gap-5">
          <div className=" flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 dark:bg-black/20
            transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          >
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
            {data.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed">
          {data.description}
        </p>
      </div>
    </motion.div>
  );
};
