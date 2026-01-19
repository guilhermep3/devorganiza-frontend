"use client";

import { FasterAttempts } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query";

export const useFasterAttempts = () => {
  return useQuery<FasterAttempts[]>({
    queryKey: ["fasterAttempts"],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== "undefined"
        ? document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] : null;

      const res = await fetch(`${API_URL}/charts/faster-attempts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar faster-attempts");
      }
      return data;
    },
  });
};
