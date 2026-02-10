"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { useCreateTask } from "@/src/api/task/useCreateTask";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  studyId: string;
  refetch: () => void;
};
export const CreateTaskModal = ({ isOpen, setIsOpen, studyId, refetch }: Props) => {
  const { handleSubmit, isPending, isSuccess, error, errors } = useCreateTask(studyId);

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      refetch();
      setTitle("")
      setLink("")
    }, 2000);

    return () => clearTimeout(timer)
  }, [isSuccess])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="dialogContentStyle">
        <DialogHeader>
          <DialogTitle>Criar tarefa</DialogTitle>
          <DialogDescription>
            Crie uma tarefa para seu estudo.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 pt-2"
          onSubmit={(e) => handleSubmit(e, { title, link })}
        >
          {error && <p className="errorMsg">{error.message}</p>}
          {isSuccess && <p className="successMsg">Tarefa criada com sucesso</p>}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Título</label>
            <input className="inputCustom w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="errorMsg">{errors.title}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Link <span className="text-xs text-gray-50 ml-1">(opcional)</span></label>
            <input className="inputCustom w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN variant="outline" type="button"
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-gray-20 hover:bg-gray-30"
            >
              Cancelar
            </ButtonCN>
            <Button submit className={`${isPending && 'pointer-events-none'}`}>
              {isPending && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};