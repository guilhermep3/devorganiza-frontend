import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useDeleteNote = (noteId: string, options?: { onSuccess?: () => void }) => {

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      return apiFetch(`/notes/${noteId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      setTimeout(() => {
        if (options?.onSuccess) options.onSuccess();
        mutation.reset();
      }, 2000);
    },
  });

  return mutation;
};