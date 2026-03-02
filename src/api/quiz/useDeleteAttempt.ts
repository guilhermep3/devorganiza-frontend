import { useMutation } from "@tanstack/react-query"

export const useDeleteAttempt = (quizId: string) => {
  const mutation = useMutation({
    mutationFn: async () => {

      const API_URL = process.env.NEXT_PUBLIC_API_URL!;

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/delete`, {
        method: "DELETE",
        credentials: "include"
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao deletar uma tentativa do quiz");
      }
      return data;
    },
  })

  return mutation;
}