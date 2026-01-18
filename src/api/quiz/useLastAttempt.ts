"use client";
import { useQuery } from "@tanstack/react-query";
import { QuizzesAttempt } from "@/src/types/quiz";

export const useLastAttempt = (quizId: string) => {
  const query = useQuery({
    queryKey: ["lastAttempt", quizId],
    enabled: !!quizId,

    queryFn: async (): Promise<QuizzesAttempt> => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN =
        typeof window !== "undefined"
          ? document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] : null;

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/last`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData?.error || "Erro ao pegar última tentativa de quiz"
        );
      }

      return res.json();
    },
  });

  return query;
};
