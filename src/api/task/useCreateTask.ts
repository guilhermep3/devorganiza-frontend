"use client";
import { useState } from "react";

export const useCreateTask = (studyId: string | null) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = typeof window !== 'undefined'
    ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
    : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);

    const newErrors: any = {};
    if (!title) { newErrors.title = "Digite o título da tarefa" };
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data: any = {};

    if (title) {
      data.title = title;
    }
    if (link) {
      data.link = link;
    }
    data.done = false;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks/${studyId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ submit: data.error || "Erro ao criar estudo" });
        return;
      }

      setSuccess("Tarefa criada com sucesso!");
    } catch (err) {
      setErrors("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  return {
    title, setTitle, link, setLink,
    loading, errors, setErrors, success, handleSubmit
  }
}