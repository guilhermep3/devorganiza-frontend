"use client"
import { UserResponse } from '@/src/types/user';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from './apiFetch';

export const useMe = () => {
  return useQuery<UserResponse>({
    queryKey: ['me'],
    queryFn: async () => apiFetch("/auth/me", { cache: "no-store" }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};