import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface CreateTask {
  title: string;
  link: string;
}

export const useCreateTask = (taskId: string | null) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: async (credentials: CreateTask) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const TOKEN = typeof window !== "undefined"
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(credentials)
      });

      const resJson = await res.json();

      if (!res.ok) {
        throw new Error(resJson.error || "Erro ao criar tarefa");
      }

      return resJson;
    },

    onSuccess: () => {
      setTimeout(() => {
        mutation.reset();
      }, 2000);
    }
  })

  async function handleSubmit(e: React.FormEvent, { title, link }: CreateTask) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!title) newErrors.title = 'Título é obrigatório';

    const data: any = {}

    if (title) data.title = title;
    if (link) data.link = link;

    mutation.mutate(data);
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
    setErrors
  };
}
