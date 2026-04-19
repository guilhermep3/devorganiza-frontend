"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description: string;
  handleAction: () => void;
  loading?: boolean;
  error?: string;
  isSuccess?: boolean;
  errorMsg: string;
};

export const DeleteModal = ({
  isOpen, setIsOpen, title, description, handleAction, loading,
  error, isSuccess, errorMsg
}: Props) => {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="ds-dialog-content">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {error && <p className="ds-message-error">{error}</p>}
        {isSuccess && <p className="ds-message-success">{errorMsg}</p>}
        <div className="flex justify-center gap-3 pt-6">
          <ButtonCN variant="outline" type="button"
            onClick={() => setIsOpen(false)}
            className="bg-gray-20 hover:bg-gray-30"
          >
            Cancelar
          </ButtonCN>
          <ButtonCN className={`bg-red-600 hover:bg-red-700 text-white ${loading && 'pointer-events-none'}`}
            onClick={handleAction}
          >
            {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
            Excluir
          </ButtonCN>
        </div>
      </DialogContent>
    </Dialog>
  );
};
