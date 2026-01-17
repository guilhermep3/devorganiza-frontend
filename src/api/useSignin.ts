import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

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
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const mutation = useMutation<SigninResponse, Error, SigninData>({
    mutationFn: async (credentials: SigninData) => {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      document.cookie = `token=${data.token}; path=/; max-age=${86400 * 2}`; // 2 days
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

    mutation.mutate({ email, password });

    return { errors: {}, hasErrors: false };
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