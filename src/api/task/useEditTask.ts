"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type EditTaskPayload = {
  title?: string;
  link?: string;
  done?: boolean;
};
export const useEditTask = (taskId: string | null) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: async (payload: EditTaskPayload) => {
      if (!taskId) throw new Error("ID do estudo não informado");

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const TOKEN = typeof window !== "undefined"
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();

      if (!res.ok) {
        throw new Error(resJson.error || "Erro ao editar o estudo");
      }

      return resJson;
    },

    onSuccess() {

    },
  });

  async function handleSubmit(e: React.FormEvent, { title, link, done }: EditTaskPayload) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!title) newErrors.title = 'Nome é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data: any = {};

    if (title) data.title = title;
    if (link) data.link = link;
    if (done) data.done = done;

    mutation.mutate(data);
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
    setErrors
  };
};
