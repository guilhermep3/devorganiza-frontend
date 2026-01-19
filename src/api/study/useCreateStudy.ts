import { useMutation } from "@tanstack/react-query"
import { useState } from "react";

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
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const TOKEN = typeof window !== 'undefined'
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/studies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar um estudo");
      }
      return data;
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