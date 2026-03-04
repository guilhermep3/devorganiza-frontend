"use client"
import { AverageTimeFinish } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useAverageTimeFinishTasksChart = () => {
  return useQuery<AverageTimeFinish[]>({
    queryKey: ["averageTimeFinishTasksChart"],
    queryFn: async () => {
      return apiFetch(`/charts/average-time-finish-task`, { method: "GET" });
    },
  });
};
