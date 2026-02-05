import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type EditTaskPayload = {
  title?: string;
  link?: string;
  done?: boolean;
};
export const useEditTask = (taskId: string | null) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: EditTaskPayload) => {
      if (!taskId) throw new Error("ID da tarefa não informado");

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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao editar o estudo");
      }

      return data;
    },

    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["studies"] });
        mutation.reset();
      }, 2000);
    }
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

    return mutation.mutate({ ...data, done });
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
    setErrors
  };
};
