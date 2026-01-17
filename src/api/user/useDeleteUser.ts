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

      if (!res.ok) {
        throw new Error("Não foi possível excluir a conta");
      }

      return true;
    },

    onSuccess: () => {
      console.log("Conta excluída com sucesso");
      setTimeout(() => {
        mutation.reset();
      }, 2000);
    },

    onError: (error) => {
      console.error(error.message);
    },
  });

  return mutation;
}