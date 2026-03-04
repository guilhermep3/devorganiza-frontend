"use client"
import { FinishedTasksByMonth } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useFinishedTasksByMonth = () => {
  return useQuery<FinishedTasksByMonth[]>({
    queryKey: ["finishedTasksByMonth"],
    queryFn: async () => {
      return apiFetch(`/charts/finished-tasks-by-month`, { method: "GET" });
    },
  });
};
