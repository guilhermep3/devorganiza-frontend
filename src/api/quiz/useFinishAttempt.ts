import { AttemptAnswer } from "@/src/types/quiz";
import { useState } from "react";

export const useFinishAttempt = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function createAttempt(quizId: string, answer: AttemptAnswer[]) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/quizzes/${quizId}/finish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(answer)
      })
      console.log("res",res)

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao finalizar tentativa de quiz");
        return;
      }
      const data = res.json();
      console.log("res.json",data)
      setData(data);
    } catch (err) {
      setError("Erro de conexão com o servidor");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    createAttempt, loading, error
  }
}