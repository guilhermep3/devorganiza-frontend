import { useEffect, useState } from "react";

export const useQuizAttempts = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  async function fetchQuizAttempts() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/quizzes/attempts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        credentials: "include"
      });
      if (!res.ok) {
        const data = await res.json();
        setErrors({ fetch: data.error || "Erro ao buscar dados das tentativas de quizzes" });
        return;
      }

      const attempts = await res.json();
      setData(attempts);
    } catch (err) {
      setErrors({ submit: "Erro ao conectar ao servidor" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuizAttempts();
  }, [])

  return {
    data, fetchQuizAttempts,
    errors, loading
  }
}