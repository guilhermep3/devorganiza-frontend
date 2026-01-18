import { Quiz } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"

export const useQuizzesLocked = () => {
  return useQuery({
    queryKey: ['quizzesLocked'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== 'undefined'
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/quizzes/locked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao buscar quizzes bloqueados");
      }

      const dataRes: Quiz[] = await res.json();
      return dataRes;
    }
  })
}