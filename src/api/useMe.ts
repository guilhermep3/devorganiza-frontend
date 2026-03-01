import { UserResponse } from '@/src/types/user';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  return useQuery<UserResponse>({
    queryKey: ['me'],
    queryFn: async () => {

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const TOKEN = typeof window !== 'undefined'
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${TOKEN}`
        },
        credentials: "include"
      });

      let data;

      try {
        data = await res.json();
      } catch (error) {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.error ?? "Erro ao obter dados do usuário");
      }

      return data;
    },
    refetchOnWindowFocus: false
  });
}
