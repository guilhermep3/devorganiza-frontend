"use client";
import { useState } from "react";

export function useEditTask(taskId: string | null) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== "undefined"
    ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
    : null;

  function resetState() {
    setSuccess(null);
    setErrors({});
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!taskId) return;

    setLoading(true);
    setErrors({});
    setSuccess(null);

    const updated: Record<string, any> = {};

    if (title) {
      updated.title = title;
    }
    if (link) {
      updated.link = link;
    }
    updated.done = done;

    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(updated),
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
    resetState, handleSubmit, loading, errors, success, setSuccess
  };
}
