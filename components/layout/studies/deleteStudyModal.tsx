"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Study } from "@/src/types/study";
import { useDeleteStudy } from "@/src/api/useDeleteStudy";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  study: Study | null;
};

export const DeleteStudyModal = ({ isOpen, setIsOpen, study }: Props) => {
  const { handleDelete, loading, error } = useDeleteStudy(study?.id ?? null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir estudo</DialogTitle>
          <DialogDescription>
            Essa ação não poderá ser desfeita.
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

          <ButtonCN className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
          >
            {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
            Excluir
          </ButtonCN>
        </div>
      </DialogContent>
    </Dialog>
  );
};
