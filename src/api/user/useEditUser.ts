import { EditProfileForm } from "@/src/schema/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

interface UserDefaultValues {
  name: string;
  username: string;
  profileImage?: string | null;
};

interface UpdateProfileParams {
  data: EditProfileForm;
  defaults: UserDefaultValues;
  imageFile?: File | null;
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

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

        const resImage = await apiFetch(`/users/image`, {
          method: "PUT",
          body: formData
        });

        if (resImage.error) {
          throw new Error(resImage.error || "Erro ao adicionar imagem");
        }

        return resImage;
      }

      if (Object.keys(changed).length > 0) {
        const res = await apiFetch(`/users`, {
          method: "PUT",
          body: JSON.stringify(changed)
        });

        if (!res.ok) {
          throw new Error(res.error || "Erro ao atualizar usuário");
        }

        return res;
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
