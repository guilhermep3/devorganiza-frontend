import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "../apiFetch";

interface CreateTask {
  title: string;
  link: string;
}

export const useCreateTask = (taskId: string | null, options?: { onSuccess?: () => void }) => {
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
        if (options?.onSuccess) options.onSuccess();
        mutation.reset();
      }, 2000);
    }
  })

  async function handleSubmit(e: React.FormEvent, data: CreateTask) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!data.title) newErrors.title = "Título é obrigatório";
    if (data.link && !/^https?:\/\/\S+$/.test(data.link)) {
      newErrors.link = "Link deve ser uma URL válida";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newData: any = {}

    if (data.title) newData.title = data.title;
    if (data.link) newData.link = data.link;

    setErrors({});
    mutation.mutate(newData);
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
  };
}
