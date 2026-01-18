"use client";
import { useMutation } from "@tanstack/react-query";

export const useStartAttempt = (quizId: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== "undefined"
        ? document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] : null;

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        }
      }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData?.error || "Erro ao iniciar tentativa de quiz"
        );
      }

      return res.json();
    },
  });

  return mutation;
};
