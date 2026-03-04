"use client"
import { WeeklyProductivity } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useWeeklyProductivity = () => {
  return useQuery<WeeklyProductivity[]>({
    queryKey: ["weeklyProductivity"],
    queryFn: async () => {
      return apiFetch(`/charts/weekly-productivity`, { method: "GET" });
    },
  });
};
