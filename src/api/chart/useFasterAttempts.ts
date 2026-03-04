"use client"
import { FasterAttempts } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useFasterAttempts = () => {
  return useQuery<FasterAttempts[]>({
    queryKey: ["fasterAttempts"],
    queryFn: async () => {
      return apiFetch(`/charts/faster-attempts`, { method: "GET" });
    },
  });
};
