"use client";
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData?.error || "Erro ao finalizar tentativa de quiz"
        );
      }

      return res.json();
    },
  });

  return mutation;
};
