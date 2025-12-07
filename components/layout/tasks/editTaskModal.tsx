"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { Task } from "@/src/types/study";
import { useEditTask } from "@/src/api/useEditTask";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  task: Task | null;
};

export const EditTaskModal = ({ isOpen, setIsOpen, task }: Props) => {
  const {
    title, setTitle,
    link, setLink,
    done, setDone,
    handleSubmit,
    loading,
    errors,
    success
  } = useEditTask(task?.id ?? null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setLink(task.link);
      setDone(task.done);
    }
  }, [task]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>
            Atualize os dados da tarefa.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Título</label>
            <input
              className="inputCustom"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="errorSubmit">{errors.title}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Link</label>
            <input
              className="inputCustom"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
            />
            <span className="text-sm">Concluída</span>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN
              variant="outline"
              onClick={() => setIsOpen(false)}
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
