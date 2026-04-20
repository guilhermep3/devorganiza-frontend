import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { Note } from "@/src/types/notes";

export const useUpdateNote = (noteId: string, options?: { onSuccess?: () => void }) => {

  const mutation = useMutation<{ note: Note }, Error, { name: string }>({
    mutationFn: async (payload) => {
      return apiFetch(`/notes/${noteId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
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