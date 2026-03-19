import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useStartAttempt = (quizId: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return apiFetch(`/quizzes/${quizId}/attempts/start`, { method: "POST" });
    },
  });

  return mutation;
};
