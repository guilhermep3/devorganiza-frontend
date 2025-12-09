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
  const TOKEN = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  function resetState(){
    setSuccess(null);
    setErrors({})
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!studyId) return;

    setLoading(true);
    setErrors({});
    setSuccess(null);

    const updated: Record<string, any> = {};
    if (name) {
      updated.name = name;
    }
    if (type) {
      updated.type = type;
    }
    if (link) {
      updated.link = link;
    }
    if (description) {
      updated.description = description;
    }

    try {
      const res = await fetch(`${API_URL}/studies/${studyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(updated),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.error });
        return;
      }

      setSuccess("Estudo atualizado com sucesso!");
      setTimeout(() => {
        setSuccess(null)
      }, 3100);
    } catch {
      setErrors({ general: "Erro ao conectar com o servidor" });
    } finally {
      setLoading(false);
    }
  }

  return {
    name, setName, type, setType,
    link, setLink, description, setDescription,
    resetState, handleSubmit, loading, errors, success,
  };
}
