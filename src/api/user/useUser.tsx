import { UserResponse } from '@/src/types/user';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: async () => {

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar usuário");
      }

      return data;
    },
    refetchOnWindowFocus: false
  });
}
