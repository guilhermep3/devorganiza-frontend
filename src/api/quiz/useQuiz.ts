"use client";
import { FullQuiz } from "@/src/types/quiz";
import { useEffect, useState } from "react"

export const useQuiz = (quizId: string) => {
  const [data, setData] = useState<FullQuiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function fetchQuiz() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/quizzes/${quizId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar quiz");
        return;
      }

      const dataRes: FullQuiz = await res.json();
      setData(dataRes);
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuiz();
  }, [])

  return {
    data, error, loading, fetchQuiz
  }
}