"use client";
import { useState } from "react";

export function useDeleteStudy(studyId: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function handleDelete() {
    if (!studyId) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${API_URL}/studies/${studyId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
        },
      });
      if (!res.ok) {
        setError("Erro ao excluir o estudo");
        return;
      }
      setSuccess("Estudo deletado com sucesso!")
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return {
    handleDelete, loading, error, success
  };
}
