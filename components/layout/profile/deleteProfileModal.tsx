"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { useDeleteUser } from "@/src/api/useDeleteUser";
import { Loader2 } from "lucide-react";

type Props = {
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;
};
export const DeleteProfileModal = ({ isDeleting, setIsDeleting }: Props) => {
  const { deleteAccount, loading, error, success } = useDeleteUser();

  async function handleDelete() {
    const deleted = await deleteAccount();

    if (deleted) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
  }

  return (
    <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir conta</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 pt-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center gap-3">
            <ButtonCN
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300"
              onClick={() => setIsDeleting(false)}
            >
              Cancelar
            </ButtonCN>
            <ButtonCN
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
              Excluir conta
            </ButtonCN>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};