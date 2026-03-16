import { useMutation } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useDeleteAttempt = (quizId: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return apiFetch(`/quizzes/${quizId}/attempts`, { method: "DELETE" })
    },
  })

  return mutation;
}