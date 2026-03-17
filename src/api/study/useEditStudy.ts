import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "../apiFetch";

type EditStudyPayload = {
  name?: string;
  type?: string;
  link?: string;
  description?: string;
};

export const useEditStudy = (studyId: string) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: EditStudyPayload) => {
      return apiFetch(`/studies/${studyId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },

    onSuccess() {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["studies"] });
        queryClient.invalidateQueries({ queryKey: ["study", studyId] });
        mutation.reset();
      }, 2000);
    },
  });

  async function handleSubmit(e: React.FormEvent, { name, type, link, description }: EditStudyPayload) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!type) newErrors.type = 'O tipo é obrigatório';
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
};
