import { QuizzesAttempt } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"

export const useQuizAttempts = () => {
  return useQuery({
    queryKey: ['quizAttempts'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;

      const res = await fetch(`${API_URL}/quizzes/attempts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar tentativas de quiz");
      }

      return data as QuizzesAttempt;
    },
    refetchOnWindowFocus: false
  })
}