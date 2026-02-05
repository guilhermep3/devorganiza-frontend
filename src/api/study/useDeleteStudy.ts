import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteStudy = (studyId: string) => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const TOKEN = typeof window !== 'undefined'
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/studies/${studyId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${TOKEN}`
        }
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