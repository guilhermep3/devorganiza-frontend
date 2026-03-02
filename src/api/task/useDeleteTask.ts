import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = (taskId: string | null) => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error("Erro ao excluir a tarefa");
      }

      return true;
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
