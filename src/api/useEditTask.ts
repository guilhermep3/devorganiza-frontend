"use client";

import { useState } from "react";

export function useEditTask(taskId: number | null) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [done, setDone] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!taskId) return;

    setLoading(true);
    setErrors({});
    setSuccess(null);

    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          title,
          link,
          done,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.error });
        return;
      }

      setSuccess("Tarefa atualizada com sucesso!");
    } catch {
      setErrors({ general: "Erro ao conectar com o servidor" });
    } finally {
      setLoading(false);
    }
  }

  return {
    title, setTitle, link, setLink, done, setDone,
    handleSubmit, loading, errors, success,
  };
}
