import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { apiFetch } from "../apiFetch";
import { Box, BoxContent, BoxType } from "@/src/types/notes";

type UpdateBoxPayload = {
  type?: BoxType;
  content?: BoxContent;
  position?: number;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

export const useUpdateBox = (
  noteId: string,
  options?: {
    onStatusChange?: (status: SaveStatus) => void;
    onSuccess?: (box: Box) => void;
  }
) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<{ boxId: string; payload: UpdateBoxPayload } | null>(null);

  const mutation = useMutation<{ box: Box }, Error, { boxId: string; payload: UpdateBoxPayload }>({
    mutationFn: async ({ boxId, payload }) => {
      return apiFetch(`/notes/${noteId}/boxes/${boxId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
    onMutate: () => {
      options?.onStatusChange?.("saving");
    },
    onSuccess: (data) => {
      options?.onStatusChange?.("saved");
      options?.onSuccess?.(data.box);
    },
    onError: () => {
      options?.onStatusChange?.("error");
    },
  });

  // Debounced save — chama API apenas após 800ms sem novas alterações
  const debouncedSave = useCallback(
    (boxId: string, payload: UpdateBoxPayload) => {
      pendingRef.current = { boxId, payload };
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
    (boxId: string, payload: UpdateBoxPayload) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      pendingRef.current = null;
      mutation.mutate({ boxId, payload });
    },
    [mutation]
  );

  return { debouncedSave, saveImmediate, ...mutation };
};