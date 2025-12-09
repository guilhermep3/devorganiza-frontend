import { useState } from "react";

export function useCreateStudy() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: any = {};
    if (!name) newErrors.name = "Digite o nome do estudo";
    if (!type) newErrors.type = "Selecione o tipo do estudo";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data: any = {};

    if (name) {
      data.name = name;
    }
    if (type) {
      data.type = type;
    }
    if (link) {
      data.link = link;
    }
    if (description) {
      data.description = description;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/studies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ submit: data.error || "Erro ao criar estudo" });
        return;
      }

      setSuccess(true);
    } catch (err) {
      setErrors("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  return {
    name, setName, type, setType,
    link, setLink, description, setDescription,
    success, loading, errors, handleSubmit
  }
}