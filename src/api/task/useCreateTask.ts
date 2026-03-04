import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "../apiFetch";

interface CreateTask {
  title: string;
  link: string;
}

export const useCreateTask = (taskId: string | null) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: async (credentials: CreateTask) => {
      return apiFetch(`/tasks/${taskId}`, {
        method: "POST",
        body: JSON.stringify(credentials)
      });
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

    return mutation.mutate(data);
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
    setErrors
  };
}
