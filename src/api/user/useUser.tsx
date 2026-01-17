import { UserResponse } from '@/src/types/user';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: async () => {

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const TOKEN = typeof window !== 'undefined'
        ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : null;

      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (!res.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }

      return res.json();
    }
  });
}
