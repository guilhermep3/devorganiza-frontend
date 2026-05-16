import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useDeleteBlock = (noteId: string, options?: { onSuccess?: () => void }) => {
  return useMutation<void, Error, string>({
    mutationFn: async (blockId: string) => {
      return apiFetch(`/notes/${noteId}/blocks/${blockId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
  });
};