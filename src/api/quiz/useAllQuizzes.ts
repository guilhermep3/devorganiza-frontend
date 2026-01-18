import { Quiz } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"

export const useAllQuizzes = () => {
  return useQuery({
    queryKey: ['allQuizzes'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== 'undefined'
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/quizzes/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao buscar todos os quizzes");
      }

      const dataRes: Quiz[] = await res.json();
      return dataRes;
    }
  })
}