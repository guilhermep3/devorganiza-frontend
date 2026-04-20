import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useDeleteBox = (noteId: string, options?: { onSuccess?: () => void }) => {
  return useMutation<void, Error, string>({
    mutationFn: async (boxId: string) => {
      return apiFetch(`/notes/${noteId}/boxes/${boxId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
  });
};