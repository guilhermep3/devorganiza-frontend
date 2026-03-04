import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useDeleteStudy = (studyId: string) => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return apiFetch(`/studies/${studyId}`, { method: "DELETE" });
    },

    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['studies'] });
        mutation.reset();
      }, 2000);
    }
  })

  return mutation;
}