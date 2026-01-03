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
  id: string | null;
  handleAction: () => void;
  fetchStudy: () => void;
  loading?: boolean;
  error?: any;
  success?: string | null;
};

export const DeleteModal = ({
  isOpen, setIsOpen, title, description, id, handleAction, fetchStudy, loading, error, success
}: Props) => {

  useEffect(() => {
    if (success !== null) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        fetchStudy();
      }, 2000);

      return () => clearTimeout(timer)
    }
  }, [success])

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
        {success && <p className="successMsg">{success}</p>}
        <div className="flex justify-center gap-3 pt-6">
          <ButtonCN type="button"
            variant="outline"
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
