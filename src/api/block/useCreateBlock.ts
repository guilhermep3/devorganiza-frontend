import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { Block, BlockContent, BlockType } from "@/src/types/notes";

type CreateBlockPayload = {
  type: BlockType;
  content: BlockContent;
  position: number;
};

export const useCreateBlock = (noteId: string, options?: { onSuccess?: (block: Block) => void }) => {
  const mutation = useMutation<{ block: Block }, Error, CreateBlockPayload>({
    mutationFn: async (payload) => {
      return apiFetch(`/notes/${noteId}/blocks`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      setTimeout(() => {
        if (options?.onSuccess) options.onSuccess(data.block);
        mutation.reset();
      }, 2000);
    },
    onError: (error: Error) => {
      alert(error.message);
    }
  });

  return mutation;
};