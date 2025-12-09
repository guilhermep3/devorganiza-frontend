"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { useCreateTask } from "@/src/api/task/useCreateTask";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  studyId: number;
};
export const CreateTaskModal = ({ isOpen, setIsOpen, studyId }: Props) => {
  const {
    title, setTitle, link, setLink,
    handleSubmit, loading, errors, setErrors, success
  } = useCreateTask(studyId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar tarefa</DialogTitle>
          <DialogDescription>
            Crie uma tarefa para seu estudo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Título</label>
            <input
              className="inputCustom w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="errorSubmit">{errors.title}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Link <span className="text-xs text-gray-50 ml-1">(opcional)</span></label>
            <input
              className="inputCustom w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN
              variant="outline"
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-gray-20 hover:bg-gray-30"
            >
              Cancelar
            </ButtonCN>
            <Button submit>
              {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};