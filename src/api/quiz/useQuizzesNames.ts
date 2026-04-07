import { Quiz } from "@/src/types/quiz";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useQuizzesNames = () => {
  return useQuery({
    queryKey: ['quizzesNames'],
    queryFn: async () => {
      const res = await apiFetch(`/quizzes/?fields=title,type`, { method: "GET" });
      return res as { title: string, type: Quiz['type'] }[];
    }
  })
}