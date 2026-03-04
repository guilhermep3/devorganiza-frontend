import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useDeleteTask = (taskId: string | null) => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return apiFetch(`/tasks/${taskId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['studies'] });
        mutation.reset();
      }, 2000);
    }
  })

  return mutation;
}
