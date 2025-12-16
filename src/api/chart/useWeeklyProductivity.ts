import { WeeklyProductivity } from "@/src/types/chart";
import { useEffect, useState } from "react";

export const useWeeklyProductivity = () => {
  const [data, setData] = useState<WeeklyProductivity[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function fetchWeeklyProductivity() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/charts/weekly-productivity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar weekly-productivity");
        return;
      }

      const data: WeeklyProductivity[] = await res.json();
      setData(data);
    } catch (error) {
      setError("Erro ao acessar weekly-productivity")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeeklyProductivity();
  }, [])

  return {
    data, error, loading
  }
}