"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import { Button as ButtonCN } from "@/components/ui/button";
import { useNote } from "@/src/api/note/useNote";
import { useUpdateNote } from "@/src/api/note/useUpdateNote";
import { useDeleteNote } from "@/src/api/note/useDeleteNote";
import { useCreateBlock } from "@/src/api/block/useCreateBlock";
import { useUpdateBlock } from "@/src/api/block/useUpdateBlock";
import { useDeleteBlock } from "@/src/api/block/useDeleteBlock";
import { DeleteModal } from "@/components/layout/deleteModal";
import { Block, BlockContent } from "@/src/types/notes";
import { AnimatePresence } from "motion/react";
import { SaveStatus } from "@/components/note/saveStatus";
import { EditorBlock } from "@/components/note/editorBlock";

type SaveStatusType = "idle" | "saving" | "saved" | "error";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const noteId = Array.isArray(params.id) ? params.id[0] : params.id as string;

  const { data, isLoading, refetch } = useNote(noteId);

  // Estado local dos blocos (para edição otimista / responsiva)
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>("idle");
  const [isEditingName, setIsEditingName] = useState(false);
  const [noteName, setNoteName] = useState("");
  const [isDeletingNote, setIsDeletingNote] = useState(false);

  // Sincroniza blocks do servidor → estado local (apenas na carga inicial)
  useEffect(() => {
    if (data) {
      console.log("data", data)
      setBlocks(data.blocks);
      setNoteName(data.note.name);
      if (data.blocks.length > 0 && !activeBlockId) {
        setActiveBlockId(data.blocks[0].id);
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

  const { mutate: createBlock } = useCreateBlock(noteId, {
    onSuccess: (newBlock) => {
      setBlocks((prev) => [...prev, newBlock]);
      setActiveBlockId(newBlock.id);
    },
  });

  const { debouncedSave } = useUpdateBlock(noteId, {
    onStatusChange: setSaveStatus,
  });

  const { mutate: deleteBlock } = useDeleteBlock(noteId, {
    onSuccess: () => refetch(),
  });

  // ---- Handlers ----

  function handleBlockChange(blockId: string, content: BlockContent, newType?: Block["type"]) {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, content, ...(newType ? { type: newType } : {}) }
          : b
      )
    );
    const block = blocks.find((b) => b.id === blockId);
    if (!block) return;
    debouncedSave(blockId, { content, ...(newType ? { type: newType } : {}) });
  }

  function handleAddBlock(afterPosition: number) {
    createBlock({
      type: "text",
      content: { text: "" },
      position: afterPosition + 1,
    });
  }

  function handleDeleteBlock(blockId: string) {
    // Não permite deletar se for o único bloco
    if (blocks.length <= 1) return;
    setBlocks((prev) => prev.filter((b) => b.id !== blockId));
    deleteBlock(blockId);

    // Foca no bloco anterior
    const index = blocks.findIndex((b) => b.id === blockId);
    const prev = blocks[index - 1] ?? blocks[index + 1];
    if (prev) setActiveBlockId(prev.id);
  }

  function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!noteName.trim()) return;
    updateNoteName({ name: noteName.trim() });
    setIsEditingName(false);
  }

  // Clique no padding abaixo do último bloco → cria novo bloco text
  function handleEditorPaddingClick() {
    const lastBlock = blocks[blocks.length - 1];
    if (lastBlock?.type === "text" && (lastBlock.content as any).text === "") {
      setActiveBlockId(lastBlock.id);
      return;
    }
    if (lastBlock) handleAddBlock(lastBlock.position);
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
            {blocks.map((block) => (
              <EditorBlock
                key={block.id}
                block={block}
                isActive={activeBlockId === block.id}
                onFocus={() => setActiveBlockId(block.id)}
                onChange={(content, newType) => handleBlockChange(block.id, content, newType)}
                onAddBlockBelow={() => handleAddBlock(block.position)}
                onBackspaceEmpty={() => handleDeleteBlock(block.id)}
                onDelete={() => handleDeleteBlock(block.id)}
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