"use client"
import { Quiz } from "@/src/types/quiz";
import { useEffect, useState } from "react"

export const useQuizzes = () => {
  const [data, setData] = useState<Quiz[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  console.log("TOKEN",TOKEN)

  async function fetchQuizzes() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quizzes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar estudos");
        return;
      }

      const dataRes: Quiz[] = await res.json();
      setData(dataRes);
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