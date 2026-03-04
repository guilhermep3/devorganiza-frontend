import { Quiz } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useQuizzesLocked = () => {
  return useQuery({
    queryKey: ['quizzesLocked'],
    queryFn: async () => {
      const res = await apiFetch(`/quizzes/locked`, { method: "GET" });
      return res as Quiz[];
    },
    refetchOnWindowFocus: false
  })
}