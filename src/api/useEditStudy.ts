"use client";

import { useState } from "react";

export function useEditStudy(studyId: number | null) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!studyId) return;

    setLoading(true);
    setErrors({});
    setSuccess(null);

    try {
      const res = await fetch(`${API_URL}/studies/${studyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name,
          type,
          link,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.error });
        return;
      }

      setSuccess("Estudo atualizado com sucesso!");
    } catch {
      setErrors({ general: "Erro ao conectar com o servidor" });
    } finally {
      setLoading(false);
    }
  }

  return {
    name, setName, type, setType,
    link, setLink, description, setDescription,
    handleSubmit, loading, errors, success,
  };
}
