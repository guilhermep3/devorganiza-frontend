"use client";
import { Check, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

type Props = {
  status: SaveStatus;
};

export function SaveStatus({ status }: Props) {
  return (
    <AnimatePresence mode="wait">
      {status !== "idle" && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-1.5 ds-text-xs"
        >
          {status === "saving" && (
            <>
              <Loader2 className="w-3 h-3 animate-spin text-gray-50" />
              <span className="text-gray-50">Salvando...</span>
            </>
          )}
          {status === "saved" && (
            <>
              <Check className="w-3 h-3 text-secondary-20" />
              <span className="text-secondary-20">Salvo</span>
            </>
          )}
          {status === "error" && (
            <>
              <X className="w-3 h-3 text-red-500" />
              <span className="text-red-500">Erro ao salvar</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}