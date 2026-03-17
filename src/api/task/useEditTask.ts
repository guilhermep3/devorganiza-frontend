import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "../apiFetch";

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

      return apiFetch(`/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
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
    if (link && !/^https?:\/\/\S+$/.test(link)) newErrors.link = 'Link deve ser uma URL válida';

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
