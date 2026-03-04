import { useMutation } from "@tanstack/react-query";

export const useStartAttempt = (quizId: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return fetch(`/quizzes/${quizId}/attempts/start`, { method: "POST" });
    },
  });

  return mutation;
};
