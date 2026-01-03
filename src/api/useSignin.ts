"use client";
import { useState } from "react";

export const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: any = {};
    if (!email) newErrors.email = "Digite um email válido";
    if (!password) newErrors.password = "Digite uma senha";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json();

      if (!res.ok) {
        setErrors({ submit: data.error || "Erro ao fazer login" });
        return;
      }
      
      document.cookie = `token=${data.token}; path=/; max-age=${86400 * 2}`;

      window.location.href = "/dashboard";
    } catch (err) {
      setErrors({ submit: "Erro ao conectar ao servidor" });
    } finally {
      setLoading(false);
    }
  }

  return {
    email, setEmail,
    password, setPassword,
    errors, loading, handleSubmit
  }
}