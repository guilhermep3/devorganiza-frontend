"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { useCreateStudy } from "@/src/api/study/useCreateStudy";
import { useEffect, useState } from "react";
import { useAllQuizzes } from "@/src/api/quiz/useAllQuizzes";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refetch: () => void;
};
export const CreateStudyModal = ({ isOpen, setIsOpen, refetch }: Props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const { handleSubmit, isSuccess, error, errors, isPending } = useCreateStudy();
  const { data } = useAllQuizzes();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      refetch();
    }, 2000);
    return () => clearTimeout(timer);
  }, [isSuccess])

  useEffect(() => {
    if (!data) return;
    if (data.find(i => i.title === name)) {
      const dataChoosed = data.find(i => i.title === name);
      setType(dataChoosed?.type!)
    }
  }, [name])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="dialogContentStyle">
        <DialogHeader>
          <DialogTitle>Criar estudo</DialogTitle>
          <DialogDescription>
            Crie um novo estudo
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 pt-2"
          onSubmit={(e) => handleSubmit(e, { name, type, link, description })}
        >
          {error && <p className="errorMsg">{error.message}</p>}
          {isSuccess && <p className="successMsg">Estudo criado com sucesso</p>}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Nome</label>
            <input list="study" className="inputCustom w-full"
              placeholder="Ex: Criar modal com React"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            <datalist id="study">
              {data?.map((q, i) => (
                <option key={q.id} value={q.title}></option>
              ))}
            </datalist>
            {errors.name && (
              <p className="errorMsg">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Tipo</label>
            <select
              className="border rounded-md px-3 py-2 inputCustom w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="outro">Outro</option>
            </select>
            {errors.type && (
              <p className="errorMsg">{errors.type}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Link (opcional)</label>
            <input className="inputCustom w-full"
              placeholder="https://..."
              value={link}
              onChange={(e: any) => setLink(e.target.value)}
            />
            {errors.link && (
              <p className="errorMsg">{errors.link}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Descrição (opcional)</label>
            <textarea className="inputCustom w-full h-24 resize-none"
              placeholder="Detalhes da tarefa..."
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="errorMsg">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN variant="outline" type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-20 hover:bg-gray-30"
            >
              Cancelar
            </ButtonCN>
            <Button submit
              className={`${isPending && 'pointer-events-none'}`}
            >
              {isPending && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
              Criar tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
