"use client";
import { useState } from "react";
import { EditProfileForm } from "../../schema/profile";

type UserDefaultValues = {
  name: string;
  username: string;
  profileImage?: string | null;
};

export const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== "undefined" ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

  async function updateProfile(data: EditProfileForm, defaults: UserDefaultValues, imageFile?: File | null) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

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
      if (Object.keys(changed).length === 0 && !imageFile) {
        setSuccess(null);
        return setError("Nada foi alterado");
      }

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const resImage = await fetch(`${API_URL}/users/image`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${TOKEN}`,
          },
          body: formData
        });

        if (!resImage.ok) {
          const errText = await resImage.text();
          throw new Error("Falha ao enviar imagem: " + errText);
        }
        const jsonImage = await resImage.json();
      }

      if (Object.keys(changed).length > 0) {
        const res = await fetch(`${API_URL}/users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(changed)
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error("Falha ao atualizar usuário: " + errText);
        }

        const json = await res.json();
      }

      setSuccess("Usuário atualizado com sucesso!");
      return true;
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    updateProfile, loading, error, success, setSuccess
  };
};
