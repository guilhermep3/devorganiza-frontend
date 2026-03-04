import { useMutation } from "@tanstack/react-query";
import { AttemptAnswer, FinishAttempt } from "@/src/types/quiz";
import { apiFetch } from "../apiFetch";

export const useFinishAttempt = (quizId: string) => {
  const mutation = useMutation({
    mutationFn: async (answers: AttemptAnswer[]): Promise<FinishAttempt> => {
      return apiFetch(`/quizzes/${quizId}/attempts/finish`, {
        method: "PUT",
        body: JSON.stringify(answers),
      });
    },
  });

  return mutation;
};
