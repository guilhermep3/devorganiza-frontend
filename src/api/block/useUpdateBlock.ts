import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { apiFetch } from "../apiFetch";
import { Block, BlockContent, BlockType } from "@/src/types/notes";

type UpdateBlockPayload = {
  type?: BlockType;
  content?: BlockContent;
  position?: number;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

export const useUpdateBlock = (
  noteId: string,
  options?: {
    onStatusChange?: (status: SaveStatus) => void;
    onSuccess?: (block: Block) => void;
  }
) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<{ blockId: string; payload: UpdateBlockPayload } | null>(null);

  const mutation = useMutation<{ block: Block }, Error, { blockId: string; payload: UpdateBlockPayload }>({
    mutationFn: async ({ blockId, payload }) => {
      return apiFetch(`/notes/${noteId}/blocks/${blockId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
    onMutate: () => {
      options?.onStatusChange?.("saving");
    },
    onSuccess: (data) => {
      options?.onStatusChange?.("saved");
      options?.onSuccess?.(data.block);
    },
    onError: (error: Error) => {
      alert(error.message);
      options?.onStatusChange?.("error");
    }
  });

  // Debounced save — chama API apenas após 800ms sem novas alterações
  const debouncedSave = useCallback(
    (blockId: string, payload: UpdateBlockPayload) => {
      pendingRef.current = { blockId, payload };
      options?.onStatusChange?.("saving");

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        if (pendingRef.current) {
          mutation.mutate(pendingRef.current);
          pendingRef.current = null;
        }
      }, 800);
    },
    [mutation, options]
  );

  const saveImmediate = useCallback(
    (blockId: string, payload: UpdateBlockPayload) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      pendingRef.current = null;
      mutation.mutate({ blockId, payload });
    },
    [mutation]
  );

  return { debouncedSave, saveImmediate, ...mutation };
};