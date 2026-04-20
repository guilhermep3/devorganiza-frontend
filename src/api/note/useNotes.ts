import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../apiFetch";
import { Note } from "@/src/types/notes";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await apiFetch("/notes", { method: "GET" });
      return res.notes as Note[];
    },
    refetchOnWindowFocus: false,
  });
};