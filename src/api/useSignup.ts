import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface SignupResponse {
  newUser: any;
}

export function useSignup() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const mutation = useMutation<SignupResponse, Error, SignupData>({
    mutationFn: async (credentials: SignupData) => {
      const res = await fetch(`${API_URL}/auth/signup`, {
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
    onSuccess: () => {
      window.location.href = '/signin';
    }
  });

  async function handleSubmit(e: React.FormEvent, { name, username, email, password }: SignupData) {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!username.trim()) newErrors.username = 'Nome de usuário é obrigatório';
    if (!email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";
    if (!password) newErrors.password = "Senha é obrigatória";
    else if (password.length < 4) newErrors.password = "Mínimo 4 caracteres";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate({ name, username, email, password });

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
  };
}
