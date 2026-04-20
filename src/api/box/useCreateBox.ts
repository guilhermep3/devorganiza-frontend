import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { Box, BoxContent, BoxType } from "@/src/types/notes";

type CreateBoxPayload = {
  type: BoxType;
  content: BoxContent;
  position: number;
};

export const useCreateBox = (noteId: string, options?: { onSuccess?: (box: Box) => void }) => {
  const mutation = useMutation<{ box: Box }, Error, CreateBoxPayload>({
    mutationFn: async (payload) => {
      return apiFetch(`/notes/${noteId}/boxes`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      setTimeout(() => {
        if (options?.onSuccess) options.onSuccess(data.box);
        mutation.reset();
      }, 2000);
    },
  });

  return mutation;
};