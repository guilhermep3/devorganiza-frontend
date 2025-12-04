import { useState } from "react";
import { EditProfileForm } from "../schema/profile";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function updateProfile(data: EditProfileForm) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("username", data.username);

      if (data.password) {
        formData.append("password", data.password);
      }

      const profileRes = await fetch(`${API_URL}/users/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        body: formData
      });

      if (!profileRes.ok) {
        throw new Error("Falha ao atualizar dados do usuário");
      }

      let imageResJson = null;

      if (data.profileImage) {
        const imgForm = new FormData();
        imgForm.append("profileImage", data.profileImage);

        const imageRes = await fetch(`${API_URL}/users/image`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`
          },
          body: imgForm,
        });

        if (!imageRes.ok) {
          throw new Error("Falha ao atualizar imagem de perfil");
        }

        imageResJson = await imageRes.json();
      }

      setSuccess(true);
      return {
        profile: await profileRes.json(),
        image: imageResJson
      };

    } catch (err: any) {
      setError(err.message);
      return null;

    } finally {
      setLoading(false);
    }
  }

  return {
    updateProfile, loading,
    error, success
  };
};