import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const mutation = useMutation({
    mutationFn: async () => {

      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== "undefined" ?
        document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/users/delete`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Não foi possível excluir a conta");
      }

      return data;
    },

    onSuccess: () => {
      document.cookie = `token=; path=/; max-age=0`;
      window.location.href = "/signin";
      setTimeout(() => {
        mutation.reset();
      }, 2000);
    },
  });

  return mutation;
}