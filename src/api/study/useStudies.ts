"use client"
import { useEffect, useState } from "react";
import { Study, StudyTask } from "../../types/study";

export function useStudies() {
  const [data, setData] = useState<StudyTask[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== 'undefined'
    ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
    : null;

  async function fetchStudies() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/studies`, {
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
      const studies: StudyTask[] = await res.json();
      setData(studies);
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudies();
  }, []);

  return {
    data, error, loading,
    fetchStudies
  }
}