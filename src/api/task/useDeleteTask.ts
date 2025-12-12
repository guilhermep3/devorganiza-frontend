"use client";
import { useState } from "react";

export function useDeleteTask(taskId: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function handleDelete() {
    if (!taskId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao excluir a tarefa");
        return;
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return {
    handleDelete, loading, error,
  };
}
