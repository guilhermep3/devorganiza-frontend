"use client"
import { Quiz } from "@/src/types/quiz";
import { useEffect, useState } from "react"

export const useAllQuizzes = () => {
  const [data, setData] = useState<Quiz[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function fetchQuizzes() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/quizzes/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar todos os quizzes");
        return;
      }

      const dataRes: Quiz[] = await res.json();
      const dataSort = dataRes.sort((a, b) => a.title.localeCompare(b.title))
      console.log("dataSort",dataSort)
      setData(dataSort);
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, [])

  return {
    data, error, loading, fetchQuizzes
  }
}