"use client";
import { FinishedTasksByMonth } from "@/src/types/chart";
import { useEffect, useState } from "react";

export const useFinishedTasksByMonth = () => {
  const [data, setData] = useState<FinishedTasksByMonth[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined'
    ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
    : null;

  async function fetchFinishedTasksByMonth() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/charts/finished-tasks-by-month`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar finished-tasks-by-month");
        return;
      }

      const data: FinishedTasksByMonth[] = await res.json();
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