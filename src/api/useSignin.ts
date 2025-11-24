import { useState } from "react";

export const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.API_URL;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: any = {};
    if (!email) newErrors.email = "Digite um email válido";
    if (!password) newErrors.password = "Digite uma senha";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/singin`, {
        method: "POST",
        headers: { "content-type": "application-json" },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        const data = await res.json();
        setErrors({ submit: data.error || "Erro ao fazer login" });
        return;
      }

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