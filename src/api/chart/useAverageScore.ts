"use client"
import { AverageScore } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useAverageScore = () => {
  return useQuery<AverageScore[]>({
    queryKey: ['averageScore'],
    queryFn: async () => {
      return apiFetch(`/charts/average-score`, { method: "GET" })
    }
  })
}