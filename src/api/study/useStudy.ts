import { StudyTask } from "@/src/types/study";
import { useQuery } from "@tanstack/react-query"

export const useStudy = (studyId: string) => {
  return useQuery({
    queryKey: ['study'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;

      const res = await fetch(`${API_URL}/studies/${studyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar estudo");
      }

      return data as StudyTask;
    },
    refetchOnWindowFocus: false
  })
}