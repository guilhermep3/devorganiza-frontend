import { AverageScore } from "@/src/types/chart";
import { useEffect, useState } from "react";

export const useAverageScore = () => {
  const [data, setData] = useState<AverageScore[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function fetchFinishedTasksByMonth() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/charts/average-score`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar average-score");
        return;
      }

      const data: AverageScore[] = await res.json();
      setData(data);
    } catch (error) {
      setError("Erro ao conectar ao servidor")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFinishedTasksByMonth();
  }, [])

  return {
    data, error, loading
  }
}