import { StudyTask } from "@/src/types/study";
import { useQuery } from "@tanstack/react-query"

export const useStudy = (studyId: string) => {
  return useQuery({
    queryKey: ['study'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== 'undefined'
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/studies/${studyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao buscar um estudo");
      }

      const dataRes: StudyTask = await res.json();
      return dataRes;
    }
  })
}