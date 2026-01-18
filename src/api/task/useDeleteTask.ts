import { useMutation } from "@tanstack/react-query";

export const useDeleteTask = (taskId: string | null) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const TOKEN = typeof window !== "undefined"
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
        },
      });

      const resJson = await res.json();

      if (!res.ok) {
        throw new Error(resJson.error || "Erro ao excluir a tarefa");
      }

      return resJson;
    },

    onSuccess: () => {
      setTimeout(() => {
        mutation.reset();
      }, 2000);
    }
  })

  return mutation;
}
