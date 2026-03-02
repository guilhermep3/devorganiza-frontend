"use client"
import { UserResponse } from '@/src/types/user';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  return useQuery<UserResponse>({
    queryKey: ['me'],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Erro ao obter dados do usuário");
      }

      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};