"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { Task } from "@/src/types/study";
import { useEditTask } from "@/src/api/task/useEditTask";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  task: Task | null | undefined;
  refetch: () => void;
};

export const EditTaskModal = ({ isOpen, setIsOpen, task, refetch }: Props) => {
  const { handleSubmit, isPending, isSuccess, error, errors } = useEditTask(task?.id ?? null);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title ?? "");
      setLink(task.link ?? "");
      setDone(task.done ?? "");
    }
  }, [task]);

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
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>
            Atualize os dados da tarefa.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 pt-2 w-full"
          onSubmit={(e) => handleSubmit(e, { title, link, done })}
        >
          {isSuccess && <p className="successMsg">Tarefa atualizada com sucesso</p>}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Título</label>
            <input
              className="inputCustom w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="errorMsg">{errors.title}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Link</label>
            <input
              className="inputCustom w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <input id="finished"
              type="checkbox"
              checked={done}
              className="w-4 h-4"
              onChange={(e) => setDone(e.target.checked)}
            />
            <label htmlFor="finished" className="text-sm">Concluída</label>
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN variant="outline" type="button"
              onClick={() => {
                setIsOpen(false);
                refetch();
              }}
              className="bg-gray-20 hover:bg-gray-30"
            >
              Cancelar
            </ButtonCN>
            <Button submit className={`${isPending && 'pointer-events-none'}`}>
              {isPending && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};