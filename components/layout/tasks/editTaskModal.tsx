"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { Task } from "@/src/types/study";
import { useEditTask } from "@/src/api/task/useEditTask";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  task: Task | null | undefined;
  fetchStudy: () => void;
};
export const EditTaskModal = ({ isOpen, setIsOpen, task, fetchStudy }: Props) => {
  const {
    title, setTitle, link, setLink, done, setDone,
    resetState, handleSubmit, loading, errors, success, setSuccess
  } = useEditTask(task?.id ?? null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setLink(task.link);
      setDone(task.done);
    }
  }, [task]);

  useEffect(() => {
    if (success !== null) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        fetchStudy();
        setSuccess(null)
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>
            Atualize os dados da tarefa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2 w-full">
          {success && <p className="successMsg">{success}</p>}
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
            <ButtonCN type="button"
              variant="outline"
              onClick={() => { setIsOpen(false), resetState() }}
              className="bg-gray-20 hover:bg-gray-30"
            >
              Cancelar
            </ButtonCN>
            <Button submit className={`${loading && 'pointer-events-none'}`}>
              {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};