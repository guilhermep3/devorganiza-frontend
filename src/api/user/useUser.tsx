import { UserResponse } from '@/src/types/user';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../apiFetch';

export const useUser = () => {
  return useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: async () => apiFetch("/users"),
    refetchOnWindowFocus: false
  });
}
