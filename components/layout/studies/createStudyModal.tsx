"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { useCreateStudy } from "@/src/api/useCreateStudy";

type Props = {
  isCreating: boolean;
  setIsCreating: (value: boolean) => void;
};

export const CreateStudyModal = ({ isCreating, setIsCreating }: Props) => {
  const {
    name, setName, type, setType,
    link, setLink, description, setDescription,
    handleSubmit, loading, errors, success
  } = useCreateStudy();

  return (
    <Dialog open={isCreating} onOpenChange={setIsCreating}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar tarefa</DialogTitle>
          <DialogDescription>
            Adicione uma nova tarefa para os seus estudos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Nome</label>
            <input className="inputCustom w-full"
              placeholder="Ex: Criar modal com React"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="errorSubmit">{errors.name}</p>
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
              <option value="ferramenta">Ferramenta</option>
            </select>
            {errors.type && (
              <p className="errorSubmit">{errors.type}</p>
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
              <p className="errorSubmit">{errors.link}</p>
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
              <p className="errorSubmit">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN
              variant="outline"
              onClick={() => setIsCreating(false)}
              className="bg-gray-20 hover:bg-gray-30"
            >
              Cancelar
            </ButtonCN>
            <Button
              onClick={handleSubmit}
              submit
            >
              {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
              Criar tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
