import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { apiFetch } from "../apiFetch";

interface StudyData {
  name: string;
  type: string;
  link: string;
  description: string;
}

export const useCreateStudy = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<any, Error, StudyData>({
    mutationFn: async (credentials: StudyData) => {
      return apiFetch(`/studies`, {
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

  async function handleSubmit(e: React.FormEvent, { name, type, link, description }: StudyData) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!type) newErrors.type = 'Tipo é obrigatório';
    if (link && !/^https?:\/\/\S+$/.test(link)) newErrors.link = 'Link deve ser uma URL válida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data: any = {};

    if (name) data.name = name;
    if (type) data.type = type;
    if (link) data.link = link;
    if (description) data.description = description;

    return mutation.mutate(data);
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
    setErrors
  };
}