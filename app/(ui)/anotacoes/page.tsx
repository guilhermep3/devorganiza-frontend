"use client";
import { Button } from "@/components/button";
import { Note } from "@/src/types/notes";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { useNotes } from "@/src/api/note/useNotes";
import { useCreateNote } from "@/src/api/note/useCreateNote";
import { NoteCardSkeleton } from "@/components/note/noteCardSkeleton";
import { NoteCard } from "@/components/note/noteCard";
import { CreateNoteModal } from "@/components/note/createNoteModal";

export default function Page() {
  const router = useRouter();
  const { data, isLoading, refetch } = useNotes();
  const [isCreating, setIsCreating] = useState(false);
  const [noteName, setNoteName] = useState("");

  const { handleSubmit, isPending, errors } = useCreateNote({
    onSuccess: (note: Note) => {
      setIsCreating(false);
      setNoteName("");
      refetch();
      router.push(`/anotacoes/${note.id}`);
    },
  });

  return (
    <div className="ds-layout-container">
      <section className="flex flex-col gap-6">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="ds-text-2xl-bold">Anotações</h1>
            <h2 className="ds-text-subtitle">Seus blocos de conhecimento</h2>
          </div>
          <Button size={1} onClick={() => setIsCreating(true)}>
            <Plus />
            <p className="hidden lg:block">Nova anotação</p>
          </Button>
        </div>

        {/* Grid de notas */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <NoteCardSkeleton key={i} />
            ))}
          </div>
        ) : data ? (
          data.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
            >
              {data.map((note: Note, index: number) => (
                <NoteCard key={note.id} note={note} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-main-10 dark:bg-main-20/30 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round" className="text-main-30"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <div>
                <p className="ds-text-md font-semibold text-gray-70 dark:text-gray-70">
                  Nenhuma anotação ainda
                </p>
                <p className="ds-text-sm text-gray-50 mt-1">
                  Crie sua primeira anotação para começar
                </p>
              </div>
              <Button size={1} onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4" />
                Criar anotação
              </Button>
            </div>
          )
        ) : (
          <p className="text-gray-40">Nenhum dado encontrado</p>
        )}
      </section>
      <CreateNoteModal
        isCreating={isCreating} setIsCreating={setIsCreating}
        noteName={noteName} setNoteName={setNoteName}
        handleSubmit={handleSubmit} isPending={isPending} errors={errors}
      />
    </div>
  );
}