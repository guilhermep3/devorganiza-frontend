"use client";
import { AverageTimeFinish } from "@/src/types/chart";
import { useEffect, useState } from "react";

export const useAverageTimeFinishTasksChart = () => {
  const [data, setData] = useState<AverageTimeFinish[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function fetchFinishedTasksByMonth() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/charts/average-time-finish-task`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar average-time-finish-task");
        return;
      }

      const data: AverageTimeFinish[] = await res.json();
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