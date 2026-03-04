import { useQuery } from "@tanstack/react-query";
import { QuizzesAttempt } from "@/src/types/quiz";
import { apiFetch } from "../apiFetch";

export const useLastAttempt = (quizId: string) => {
  const query = useQuery({
    queryKey: ["lastAttempt", quizId],
    enabled: !!quizId,

    queryFn: async (): Promise<QuizzesAttempt> => {
      const res = await apiFetch(`/quizzes/${quizId}/attempts/last`, { method: "GET" });
      return res;
    },
  });

  return query;
};
