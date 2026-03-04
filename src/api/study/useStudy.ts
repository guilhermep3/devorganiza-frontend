import { StudyTask } from "@/src/types/study";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useStudy = (studyId: string) => {
  return useQuery({
    queryKey: ['study'],
    queryFn: async () => {
      const res = await apiFetch(`/studies/${studyId}`, { method: "GET" });
      return res as StudyTask;
    },
    refetchOnWindowFocus: false
  })
}