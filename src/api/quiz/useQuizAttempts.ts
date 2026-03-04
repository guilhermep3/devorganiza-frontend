import { QuizzesAttempt } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useQuizAttempts = () => {
  return useQuery({
    queryKey: ['quizAttempts'],
    queryFn: async () => {
      const res = await apiFetch(`/quizzes/attempts`, { method: "GET" });
      return res as QuizzesAttempt;
    },
    refetchOnWindowFocus: false
  })
}