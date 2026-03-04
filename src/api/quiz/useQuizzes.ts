import { Quiz } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useQuizzes = () => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const res = await apiFetch(`/quizzes`, {
        method: "GET"
      });

      return res as Quiz[];
    },
    refetchOnWindowFocus: false
  })
}