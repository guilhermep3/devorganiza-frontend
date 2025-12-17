import { TasksByType } from "@/src/types/chart";
import { useEffect, useState } from "react";

export const useTasksByType = () => {
  const [data, setData] = useState<TasksByType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function fetchTasksByType() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/charts/tasks-by-type`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar tasks-by-type");
        return;
      }

      const data: TasksByType[] = await res.json();
      setData(data);
    } catch (error) {
      setError("Erro ao conectar ao servidor")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasksByType();
  }, [])

  return {
    data, error, loading
  }
}