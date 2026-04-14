"use client"
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { removeToken } from "@/src/utils/token";

export const useDeleteUser = () => {
  const mutation = useMutation({
    mutationFn: async () => {

      const res = await apiFetch(`/users`, { method: "DELETE", });

      const contentType = res.headers.get("Content-Type");

      let data;

      if (!contentType || !contentType.includes("application/json")) {
        data = await res.text();
      } else {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data.error || "Não foi possível excluir a conta");
      }

      return data;
    },

    onSuccess: () => {
      removeToken();
      window.location.href = "/signin";
      setTimeout(() => {
        mutation.reset();
      }, 2000);
    },
  });

  return mutation;
}