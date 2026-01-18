"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type EditStudyPayload = {
  name?: string;
  type?: string;
  link?: string;
  description?: string;
};

export const useEditStudy = (studyId: string | null) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: EditStudyPayload) => {
      if (!studyId) throw new Error("ID do estudo não informado");

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const TOKEN = typeof window !== "undefined"
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/studies/${studyId}`, {
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
      queryClient.invalidateQueries({ queryKey: ["studies"] });
      queryClient.invalidateQueries({ queryKey: ["study", studyId] });
    },
  });

  async function handleSubmit(e: React.FormEvent, { name, type, link, description }: EditStudyPayload) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!type) newErrors.type = 'O tipo é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data: any = {};

    if (name) data.name = name;
    if (type) data.type = type;
    if (link) data.link = link;
    if (description) data.description = description;

    mutation.mutate(data);
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
    setErrors
  };
};
