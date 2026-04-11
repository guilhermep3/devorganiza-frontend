"use client"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "./apiFetch";
import { createCookie } from "../utils/createCookie";

interface SigninData {
  email: string;
  password: string;
}

interface SigninResponse {
  token: string;
  user: any;
}

export const useSignin = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<SigninResponse, Error, SigninData>({
    mutationFn: async (credentials: SigninData) => {
      return apiFetch(`/auth/signin`, {
        method: "POST",
        body: JSON.stringify(credentials)
      })
    },
    onSuccess: (data) => {
      document.cookie = createCookie(data.token);
      window.location.href = '/dashboard';
    },
  });

  async function handleSubmit(e: React.FormEvent, { email, password }: SigninData) {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";
    if (!password) newErrors.password = "Senha é obrigatória";
    else if (password.length < 4) newErrors.password = "Mínimo 4 caracteres";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    return mutation.mutate({ email, password });
  }

  function clearErrors(field: string) {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      })
    }
  }

  return {
    ...mutation,
    handleSubmit,
    errors,
    clearErrors
  }
}