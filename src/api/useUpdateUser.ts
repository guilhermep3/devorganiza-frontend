import { useState } from "react";
import { EditProfileForm } from "../schema/profile";

type UserDefaultValues = {
  name: string;
  username: string;
  profileImageUrl?: string;
};

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function updateProfile(data: EditProfileForm, defaults: UserDefaultValues) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const changed: Record<string, any> = {};

      if (data.name !== defaults.name) {
        changed.name = data.name;
      }
      if (data.username !== defaults.username) {
        changed.username = data.username;
      }
      if (data.password && data.password.trim() !== "") {
        changed.password = data.password;
      }
      if (data.profileImage) {
        changed.profileImage = data.profileImage;
      }
      if (Object.keys(changed).length === 0) {
        setSuccess(true);
        return { message: "Nada foi alterado" };
      }

      const res = await fetch(`${API_URL}/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(changed)
      });

      if (!res.ok) {
        throw new Error("Falha ao atualizar usuário");
      }

      const json = await res.json();
      setSuccess(true);
      return json;

    } catch (err: any) {
      setError(err.message);
      return null;

    } finally {
      setLoading(false);
    }
  }

  return {
    updateProfile,
    loading,
    error,
    success
  };
};
