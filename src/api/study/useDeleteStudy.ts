import { useMutation } from "@tanstack/react-query"
import { apiFetch } from "../apiFetch";

export const useDeleteStudy = (studyId: string, options?: { onSuccess?: () => void }) => {

  const mutation = useMutation({
    mutationFn: async () => {
      return apiFetch(`/studies/${studyId}`, { method: "DELETE" });
    },

    onSuccess: () => {
      setTimeout(() => {
        if (options?.onSuccess) options.onSuccess();
        mutation.reset();
      }, 2000);
    }
  })

  return mutation;
}