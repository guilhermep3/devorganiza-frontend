import { useMutation } from "@tanstack/react-query"

export const useDeleteAttempt = (quizId: string) => {
  const mutation = useMutation({
    mutationFn: async () => {

      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== "undefined" ?
        document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/delete`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${TOKEN}`
        }
      })

      if (!res.ok) {
        throw new Error("Erro ao deletar uma tentativa do quiz");
      }

      return res.json();
    },
  })

  return mutation;
}