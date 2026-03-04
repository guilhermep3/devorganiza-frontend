import { FullQuiz } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useQuiz = (quizId: string) => {
  return useQuery({
    queryKey: ['quiz'],
    queryFn: async () => {
      const res = await apiFetch(`/quizzes/${quizId}`, { method: "GET" });
      return res as FullQuiz;
    },
    refetchOnWindowFocus: false
  })
}