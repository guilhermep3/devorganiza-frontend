import { Quiz } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useAllQuizzes = () => {
  return useQuery({
    queryKey: ['allQuizzes'],
    queryFn: async () => {
      const res = await apiFetch(`/quizzes/all`, { method: "GET" });
      return res as Quiz[];
    }
  })
}