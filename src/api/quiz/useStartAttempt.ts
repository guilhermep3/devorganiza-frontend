"use client";
import { useState } from "react";

export const useStartAttempt = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function startAttempt(quizId: string) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao iniciar tentativa de quiz");
        return;
      }
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError("Erro de conexão com o servidor");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    startAttempt, loading, error
  }
}