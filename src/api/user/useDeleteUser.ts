import { useState } from "react";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function deleteAccount() {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await fetch(`${API_URL}/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        throw new Error("Não foi possível excluir a conta");
      }

      setSuccess("Usuário deletado com sucesso!");
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;

    } finally {
      setLoading(false);
    }
  }

  return {
    deleteAccount, loading, error, success
  };
};