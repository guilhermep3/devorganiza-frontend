import { useEffect, useState } from "react";
import { UserResponse } from "../../types/user";

export const useUser = () => {
  const [data, setData] = useState<UserResponse | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const TOKEN = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        credentials: "include"
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ fetch: data.error || "Erro ao buscar dados do usuário" });
        return;
      }

      const user = await res.json() as UserResponse;
      setData(user);
    } catch (err) {
      setErrors({ submit: "Erro ao conectar ao servidor" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    data, fetchUser,
    errors, loading
  }
}