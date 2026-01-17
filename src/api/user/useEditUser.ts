import { EditProfileForm } from "@/src/schema/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UserDefaultValues = {
  name: string;
  username: string;
  profileImage?: string | null;
};

type UpdateProfileParams = {
  data: EditProfileForm;
  defaults: UserDefaultValues;
  imageFile?: File | null;
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const TOKEN = typeof window !== "undefined"
    ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

  const mutation = useMutation({
    mutationFn: async ({ data, defaults, imageFile }: UpdateProfileParams) => {
      const changed: Record<string, any> = {};

      if (data.name !== defaults.name) changed.name = data.name;
      if (data.username !== defaults.username) changed.username = data.username;
      if (data.password && data.password.trim() !== "") changed.password = data.password;

      if (Object.keys(changed).length === 0 && !imageFile) {
        throw new Error("Nada foi alterado");
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
          throw new Error("Falha ao enviar imagem");
        }
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
          throw new Error("Falha ao atualizar usuário");
        }
      }

      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      setTimeout(() => {
        mutation.reset();
      }, 2000);
    },
  })

  return {
    ...mutation,
    updateProfile: mutation.mutateAsync,
  }
}
