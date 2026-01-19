import { FinishedTasksByMonth } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query";

export const useFinishedTasksByMonth = () => {
  return useQuery<FinishedTasksByMonth[]>({
    queryKey: ["finishedTasksByMonth"],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== "undefined"
        ? document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] : null;

      const res = await fetch(`${API_URL}/charts/finished-tasks-by-month`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar finished-tasks-by-month");
      }
      return data;
    },
  });
};
