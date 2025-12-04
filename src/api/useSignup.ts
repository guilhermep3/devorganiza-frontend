import { useState } from "react";

export function useSignup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: any = {};
    if (!name) newErrors.name = "Digite seu nome completo";
    if (!username) newErrors.username = "Digite um nome de usuário";
    if (!email) newErrors.email = "Digite um email válido";
    if (!password) newErrors.password = "Digite uma senha";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ submit: data.error || "Erro ao criar conta" });
        return;
      }

      window.location.href = "/signin";
    } catch (err) {
      setErrors({ submit: "Erro de conexão com o servidor" });
    } finally {
      setLoading(false);
    }
  }

  return {
    name, setName,
    username, setUsername,
    email, setEmail,
    password, setPassword,
    errors, loading, handleSubmit
  };
}
