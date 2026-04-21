"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import { Button as ButtonCN } from "@/components/ui/button";
import { useNote } from "@/src/api/note/useNote";
import { useUpdateNote } from "@/src/api/note/useUpdateNote";
import { useDeleteNote } from "@/src/api/note/useDeleteNote";
import { useCreateBox } from "@/src/api/box/useCreateBox";
import { useUpdateBox } from "@/src/api/box/useUpdateBox";
import { useDeleteBox } from "@/src/api/box/useDeleteBox";
import { DeleteModal } from "@/components/layout/deleteModal";
import { Box, BoxContent } from "@/src/types/notes";
import { AnimatePresence } from "motion/react";
import { SaveStatus } from "@/components/note/saveStatus";
import { EditorBox } from "@/components/note/editorBox";

type SaveStatusType = "idle" | "saving" | "saved" | "error";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const noteId = Array.isArray(params.id) ? params.id[0] : params.id as string;

  const { data, isLoading, refetch } = useNote(noteId);

  // Estado local dos blocos (para edição otimista / responsiva)
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>("idle");
  const [isEditingName, setIsEditingName] = useState(false);
  const [noteName, setNoteName] = useState("");
  const [isDeletingNote, setIsDeletingNote] = useState(false);

  // Sincroniza boxes do servidor → estado local (apenas na carga inicial)
  useEffect(() => {
    if (data) {
      setBoxes(data.boxes);
      setNoteName(data.note.name);
      if (data.boxes.length > 0 && !activeBoxId) {
        setActiveBoxId(data.boxes[0].id);
      }
    }
  }, [data]);

  // Limpa status "salvo" após 3s
  useEffect(() => {
    if (saveStatus === "saved") {
      const t = setTimeout(() => setSaveStatus("idle"), 3000);
      return () => clearTimeout(t);
    }
  }, [saveStatus]);

  const { mutate: updateNoteName } = useUpdateNote(noteId, {
    onSuccess: () => refetch(),
  });

  const { mutate: deleteNote, isPending: isDeletingPending } = useDeleteNote(noteId, {
    onSuccess: () => { setIsDeletingNote(false); router.push("/anotacoes"); },
  });

  const { mutate: createBox } = useCreateBox(noteId, {
    onSuccess: (newBox) => {
      setBoxes((prev) => [...prev, newBox]);
      setActiveBoxId(newBox.id);
    },
  });

  const { debouncedSave } = useUpdateBox(noteId, {
    onStatusChange: setSaveStatus,
  });

  const { mutate: deleteBox } = useDeleteBox(noteId, {
    onSuccess: () => refetch(),
  });

  // ---- Handlers ----

  function handleBoxChange(boxId: string, content: BoxContent, newType?: Box["type"]) {
    setBoxes((prev) =>
      prev.map((b) =>
        b.id === boxId
          ? { ...b, content, ...(newType ? { type: newType } : {}) }
          : b
      )
    );
    const box = boxes.find((b) => b.id === boxId);
    if (!box) return;
    debouncedSave(boxId, { content, ...(newType ? { type: newType } : {}) });
  }

  function handleAddBox(afterPosition: number) {
    createBox({
      type: "text",
      content: { text: "" },
      position: afterPosition + 1,
    });
  }

  function handleDeleteBox(boxId: string) {
    // Não permite deletar se for o único bloco
    if (boxes.length <= 1) return;
    setBoxes((prev) => prev.filter((b) => b.id !== boxId));
    deleteBox(boxId);

    // Foca no bloco anterior
    const index = boxes.findIndex((b) => b.id === boxId);
    const prev = boxes[index - 1] ?? boxes[index + 1];
    if (prev) setActiveBoxId(prev.id);
  }

  function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!noteName.trim()) return;
    updateNoteName({ name: noteName.trim() });
    setIsEditingName(false);
  }

  // Clique no padding abaixo do último bloco → cria novo bloco text
  function handleEditorPaddingClick() {
    const lastBox = boxes[boxes.length - 1];
    if (lastBox?.type === "text" && (lastBox.content as any).text === "") {
      setActiveBoxId(lastBox.id);
      return;
    }
    if (lastBox) handleAddBox(lastBox.position);
  }

  if (isLoading) {
    return (
      <div className="ds-layout-container">
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-8 w-1/2 rounded-lg bg-gray-20 dark:bg-gray-30" />
          <div className="h-4 w-1/4 rounded bg-gray-20 dark:bg-gray-30" />
          <div className="mt-6 flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 rounded-lg bg-gray-20 dark:bg-gray-30" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-layout-container">
      <section className="flex flex-col gap-4">
        {/* Cabeçalho */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <form onSubmit={handleNameSubmit} className="flex items-center gap-2">
                <input
                  autoFocus
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
                  onBlur={handleNameSubmit}
                  className="ds-input text-xl font-bold flex-1"
                />
              </form>
            ) : (
              <h1
                className="ds-text-2xl-bold cursor-pointer hover:text-main-30 transition-colors truncate"
                onClick={() => setIsEditingName(true)}
                title="Clique para editar o nome"
              >
                {data?.note.name}
              </h1>
            )}
            <h2 className="ds-text-subtitle flex items-center gap-2 mt-2 text-sm">
              <button
                onClick={() => router.push("/anotacoes")}
                className="group inline-flex items-center justify-center p-1 rounded-full cursor-pointer
                  border border-gray-40 bg-white dark:bg-gray-10 transition hover:bg-gray-20
                  hover:border-gray-50 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-gray-70 transition" />
              </button>
              anotacoes / {data?.note.name}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <SaveStatus status={saveStatus} />
            <ButtonCN size="sm"
              onClick={() => setIsEditingName(true)}
              className="bg-main-30 hover:bg-main-30 hover:brightness-95 text-white"
            >
              <Pencil size={16} />
            </ButtonCN>
            <ButtonCN size="sm"
              variant="destructive"
              onClick={() => setIsDeletingNote(true)}
            >
              <Trash2 size={16} />
            </ButtonCN>
          </div>
        </div>
        <div
          className="flex flex-col min-h-[400px] cursor-text w-[calc(100vw-48px)] md:w-full"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleEditorPaddingClick();
          }}
        >
          <AnimatePresence initial={false}>
            {boxes.map((box) => (
              <EditorBox
                key={box.id}
                box={box}
                isActive={activeBoxId === box.id}
                onFocus={() => setActiveBoxId(box.id)}
                onChange={(content, newType) => handleBoxChange(box.id, content, newType)}
                onAddBoxBelow={() => handleAddBox(box.position)}
                onBackspaceEmpty={() => handleDeleteBox(box.id)}
                onDelete={() => handleDeleteBox(box.id)}
              />
            ))}
          </AnimatePresence>
          <div className="flex-1 min-h-40 cursor-text"
            onClick={handleEditorPaddingClick}
          />
        </div>
      </section>
      <DeleteModal
        isOpen={isDeletingNote}
        setIsOpen={setIsDeletingNote}
        handleAction={deleteNote}
        title="Excluir anotação"
        description="Todos os blocos serão excluídos. Essa ação não poderá ser desfeita."
        loading={isDeletingPending}
        isSuccess={false}
        error={undefined}
        errorMsg="Anotação excluída com sucesso"
      />
    </div>
  );
}