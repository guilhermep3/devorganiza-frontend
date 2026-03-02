import { Quiz } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"

export const useAllQuizzes = () => {
  return useQuery({
    queryKey: ['allQuizzes'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;

      const res = await fetch(`${API_URL}/quizzes/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar todos os quizzes");
      }
      return data as Quiz[];
    }
  })
}