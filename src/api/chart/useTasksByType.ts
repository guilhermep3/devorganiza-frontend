"use client"
import { TasksByType } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";

export const useTasksByType = () => {
  return useQuery<TasksByType[]>({
    queryKey: ["tasksByType"],
    queryFn: async () => {
      return apiFetch(`/charts/tasks-by-type`, { method: "GET" });
    },
  });
};
