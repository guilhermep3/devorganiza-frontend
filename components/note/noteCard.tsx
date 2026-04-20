"use client";
import { Note } from "@/src/types/notes";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

type Props = {
  note: Note;
  index: number;
};

export function NoteCard({ note, index }: Props) {
  const router = useRouter();

  const date = new Date(note.updatedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      onClick={() => router.push(`/anotacoes/${note.id}`)}
      className="group relative flex flex-col gap-2 p-4 rounded-xl border border-gray-20
        bg-white dark:bg-gray-10 cursor-pointer
        hover:border-main-30 hover:shadow-md hover:shadow-main-30/10
        transition-all duration-200 active:scale-[0.98]"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-main-10 dark:bg-main-20/30 ds-card-icon">
          <FileText className="w-4 h-4 text-main-50 dark:text-main-40" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="ds-text-md font-semibold truncate text-gray-90 dark:text-gray-90 leading-tight">
            {note.name}
          </p>
          <p className="ds-text-xs text-gray-50 mt-1">{date}</p>
        </div>
      </div>
    </motion.div>
  );
}