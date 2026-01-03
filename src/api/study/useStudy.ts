"use client";
import { useEffect, useState } from "react";
import { StudyTask } from "../../types/study";

export function useStudy(studyId: string) {
  const [data, setData] = useState<StudyTask | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== "undefined"
    ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
    : null;

  async function fetchStudy() {
    if (!studyId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/studies/${studyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao buscar o estudo");
        return;
      }

      const study: StudyTask = await res.json();
      setData(study);
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudy();
  }, []);

  return {
    data,
    error,
    loading,
    fetchStudy,
  };
}
