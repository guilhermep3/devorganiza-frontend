import { useQuery } from "@tanstack/react-query";
import { QuizzesAttempt } from "@/src/types/quiz";

export const useLastAttempt = (quizId: string) => {
  const query = useQuery({
    queryKey: ["lastAttempt", quizId],
    enabled: !!quizId,

    queryFn: async (): Promise<QuizzesAttempt> => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN =
        typeof window !== "undefined"
          ? document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] : null;

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/last`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao pegar última tentativa de quiz");
      }

      return data;
    },
  });

  return query;
};
