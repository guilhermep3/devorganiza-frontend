"use client"
import { useEffect, useState } from "react";

export interface Study {
  name: string;
  type?: string | null;
  link?: string | null;
  description?: string | null;
  status?: string;
  progress?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  tasks?: any
  user: any
}

export function useStudies() {
  const [data, setData] = useState<Study[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN!;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function fetchStudies() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/studies/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AUTH_TOKEN}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao buscar estudos");
        return;
      }
      const studies = await res.json();
      console.log(studies);
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