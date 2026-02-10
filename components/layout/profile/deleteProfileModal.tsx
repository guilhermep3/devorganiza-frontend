"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { useDeleteUser } from "@/src/api/user/useDeleteUser";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

type Props = {
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;
};
export const DeleteProfileModal = ({ isDeleting, setIsDeleting }: Props) => {
  const { mutate, isPending, error, isSuccess } = useDeleteUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDeleting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess])

  return (
    <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
      <DialogContent className="dialogContentStyle">
        <DialogHeader>
          <DialogTitle>Excluir conta</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 pt-4">
          {error && <p className="errorMsg">{error.message}</p>}
          {isSuccess && <p className="successMsg">Conta excluída com sucesso</p>}
          <div className="flex items-center gap-3">
            <ButtonCN variant="outline" type="button"
              className="bg-gray-200 hover:bg-gray-300"
              onClick={() => setIsDeleting(false)}
            >
              Cancelar
            </ButtonCN>
            <ButtonCN
              onClick={() => mutate()}
              disabled={isPending}
              className={`bg-red-600 hover:bg-red-700 text-white ${isPending && 'pointer-events-none'}`}
            >
              {isPending && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
              Excluir conta
            </ButtonCN>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};