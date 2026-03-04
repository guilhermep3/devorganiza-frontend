import { StudyTask } from "@/src/types/study";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useStudies = () => {
  return useQuery({
    queryKey: ['studies'],
    queryFn: async () => {
      const res = await apiFetch(`/studies`, { method: "GET" });
      return res as StudyTask[];
    },
    refetchOnWindowFocus: false
  })
}