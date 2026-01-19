import { useMutation } from "@tanstack/react-query";
import { AttemptAnswer, FinishAttempt } from "@/src/types/quiz";

export const useFinishAttempt = (quizId: string) => {
  const mutation = useMutation({
    mutationFn: async (answers: AttemptAnswer[]): Promise<FinishAttempt> => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN =
        typeof window !== "undefined"
          ? document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] : null;

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/finish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(answers),
      }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao finalizar uma tentativa de quiz");
      }

      return data;
    },
  });

  return mutation;
};
