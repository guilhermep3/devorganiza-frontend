"use client";
import { useState } from "react";

export function useDeleteTask(taskId: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function handleDelete() {
    if (!taskId) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
        },
      });
      console.log("res", res)

      if (!res.ok) {
        setError("Erro ao excluir a tarefa");
        return;
      }
      setSuccess("Tarefa deletada com sucesso!");
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
