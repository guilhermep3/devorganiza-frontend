import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useDeleteTask = (taskId: string | null, options?: { onSuccess?: () => void }) => {

  const mutation = useMutation({
    mutationFn: async () => {
      return apiFetch(`/tasks/${taskId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      setTimeout(() => {
        if (options?.onSuccess) options?.onSuccess();
        mutation.reset();
      }, 2000);
    }
  })

  return mutation;
}
