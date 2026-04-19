import { ServicesData } from "@/src/data/services";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  data: ServicesData;
  Icon: LucideIcon;
  variant: "primary" | "secondary";
};

export const HomeCard = ({ data, Icon, variant }: Props) => {
  return (
    <motion.div
      initial={{ scale: 0.3 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
    >
      <div
        className={`group relative flex flex-col gap-3 p-5 bg-card
        rounded-lg transition duration-200 border
        hover:-translate-y-2 hover:shadow-gray-30 dark:hover:shadow-gray-10
        ${variant === "primary"
            ? "border-main-30/50 hover:border-main-40/50 hover:shadow-[0_12px_40px_-4px_rgba(0,183,255,0.3)]"
            : "border-secondary-10/50 hover:border-secondary-20/50 hover:shadow-[0_12px_40px_-4px_rgba(5,175,90,0.35)]"
          }`}
      >
        <div
          className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition
          pointer-events-none
          ${variant === "primary"
              ? "bg-linear-to-br from-main-40/10 via-main-40/5 to-transparent"
              : "bg-linear-to-br from-secondary-20/10 via-secondary-20/5 to-transparent"
            }`}
        />
        <div
          className="absolute inset-0 rounded-lg opacity-100 group-hover:opacity-0 transition
          pointer-events-none bg-linear-to-br from-transparent via-main-40/5 to-transparent"
        />
        <div className="relative flex items-center gap-5">
          <div
            className={`ds-card-icon
            ${variant === "primary"
                ? "bg-main-40/10 group-hover:bg-main-40/20 text-main-30"
                : "bg-secondary-20/10 group-hover:bg-secondary-20/20 text-secondary-20"
              }`}
          >
            <Icon />
          </div>
        </div>
        <p className="ds-text-xl font-semibold">
          {data.title}
        </p>
        <p className="text-sm text-gray-70 dark:text-gray-60">
          {data.description}
        </p>
      </div>
    </motion.div>
  );
};