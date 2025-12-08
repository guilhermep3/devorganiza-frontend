"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Study } from "@/src/types/study";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description: string;
  id: number | null;
  handleAction: () => void;
  loading?: boolean;
  error?: any;
};

export const DeleteModal = ({ isOpen, setIsOpen, title, description, id, handleAction, loading, error }: Props) => {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {error && <p className="errorSubmit">{error}</p>}
        <div className="flex justify-center gap-3 pt-6">
          <ButtonCN
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="bg-gray-20 hover:bg-gray-30"
          >
            Cancelar
          </ButtonCN>
          <ButtonCN className="bg-red-600 hover:bg-red-700 text-white"
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
