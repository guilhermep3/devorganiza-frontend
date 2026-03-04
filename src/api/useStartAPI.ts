import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";

export function useStartAPI() {
  return useQuery({
    queryKey: ['startAPI'],
    queryFn: async () => {
      return apiFetch(`/health`, { method: "GET" });
    },
    retry: 3,
    retryDelay: 5000,
    refetchOnWindowFocus: true
  })
}