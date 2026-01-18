"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description: string;
  handleAction: () => void;
  refetch: () => void;
  loading?: boolean;
  error?: string;
  isSuccess?: boolean;
  successMsg: string;
};

export const DeleteModal = ({
  isOpen, setIsOpen, title, description, handleAction, refetch, loading, error, isSuccess, successMsg
}: Props) => {

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        refetch();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {error && <p className="errorMsg">{error}</p>}
        {isSuccess && <p className="successMsg">{successMsg}</p>}
        <div className="flex justify-center gap-3 pt-6">
          <ButtonCN variant="outline" type="button"
            onClick={() => setIsOpen(false)}
            className="bg-gray-20 hover:bg-gray-30"
          >
            Cancelar
          </ButtonCN>
          <ButtonCN className={`bg-red-600 hover:bg-red-700 text-white ${loading && 'pointer-events-none'}`}
            onClick={() => {
              handleAction();
            }}
          >
            {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
            Excluir
          </ButtonCN>
        </div>
      </DialogContent>
    </Dialog>
  );
};
