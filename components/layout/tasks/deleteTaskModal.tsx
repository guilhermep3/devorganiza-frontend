"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Task } from "@/src/types/study";
import { useDeleteTask } from "@/src/api/task/useDeleteTask";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  task: Task | null;
};

export const DeleteTaskModal = ({ isOpen, setIsOpen, task }: Props) => {
  const { handleDelete, loading, error } = useDeleteTask(task?.id ?? null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir tarefa</DialogTitle>
          <DialogDescription>
            Essa ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="errorSubmit">{error}</p>}
        <div className="flex justify-center gap-3 pt-6">
          <ButtonCN type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="bg-gray-20 hover:bg-gray-30"
          >
            Cancelar
          </ButtonCN>
          <ButtonCN
            variant="destructive"
            onClick={handleDelete}
            className={`text-white ${loading && 'pointer-events-none'}`}
          >
            {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
            Excluir
          </ButtonCN>
        </div>
      </DialogContent>
    </Dialog>
  );
};
