"use client";
import { QuizzesAttempt } from "@/src/types/quiz";
import { useEffect, useState } from "react";

export const useLastAttempt = (quizId: string) => {
  const [data, setData] = useState<QuizzesAttempt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

  async function fetchLastAttempt() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/last`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao pegar última tentativa de quiz");
        return;
      }
      const data: QuizzesAttempt = await res.json();
      setData(data);
    } catch (err) {
      setError("Erro de conexão com o servidor");
      return null;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!quizId) return;
    fetchLastAttempt();
  }, [quizId]);

  return {
    data, loading, error
  }
}