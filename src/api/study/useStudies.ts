import { StudyTask } from "@/src/types/study";
import { useQuery } from "@tanstack/react-query"

export const useStudies = () => {
  return useQuery({
    queryKey: ['studies'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;

      const res = await fetch(`${API_URL}/studies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar estudos");
      }

      return data as StudyTask[];
    },
    refetchOnWindowFocus: false
  })
}