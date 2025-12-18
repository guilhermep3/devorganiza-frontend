"use client";
import { useState } from "react";

export const useDeleteAttempt = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function deleteAttempt(quizId: string) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/quizzes/${quizId}/attempts/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao finalizar tentativa de quiz");
        return;
      }
      const data = await res.json();
      setSuccess(data.message);
    } catch (err) {
      setError("Erro de conexão com o servidor");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteAttempt, loading, error, success
  }
}