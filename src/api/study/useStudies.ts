import { StudyTask } from "@/src/types/study";
import { useQuery } from "@tanstack/react-query"

export const useStudies = () => {
  return useQuery({
    queryKey: ['studies'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== 'undefined'
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/studies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao buscar estudos");
      }

      const dataRes: StudyTask[] = await res.json();
      return dataRes;
    }
  })
}