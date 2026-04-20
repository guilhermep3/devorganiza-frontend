import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { Note } from "@/src/types/notes";
import { useState } from "react";

export const useCreateNote = (options?: { onSuccess?: (note: Note) => void }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<{ note: Note }, Error, { name: string }>({
    mutationFn: async (name) => {
      return apiFetch("/notes", {
        method: "POST",
        body: JSON.stringify(name),
      });
    },
    onSuccess: (data) => {
      setTimeout(() => {
        if (options?.onSuccess) options.onSuccess(data.note);
        mutation.reset();
      }, 2000);
    },
  });

  async function handleSubmit(e: React.FormEvent, { name }: { name: string }) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!name || !name.trim()) newErrors.name = 'Nome é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    return mutation.mutate({ name: name.trim() });
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
    setErrors
  };
};