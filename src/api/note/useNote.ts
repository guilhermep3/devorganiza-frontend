import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { NoteWithBlocks } from "@/src/types/notes";

export const useNote = (id: string) => {
  return useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await apiFetch(`/notes/${id}`, { method: "GET" });
      return res as NoteWithBlocks;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};