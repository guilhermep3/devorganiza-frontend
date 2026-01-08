"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { Study } from "@/src/types/study";
import { useEffect } from "react";
import { useEditStudy } from "@/src/api/study/useEditStudy";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  study: Study | null;
  fetchStudy: () => void;
};
export const EditStudyModal = ({ isOpen, setIsOpen, study, fetchStudy }: Props) => {
  const {
    name, setName, type, setType,
    link, setLink, description, setDescription,
    resetState, handleSubmit, loading, errors, success
  } = useEditStudy(study?.id ?? null);

  useEffect(() => {
    if (study) {
      setName(study.name || "");
      setType(study.type || "");
      setLink(study.link || "");
      setDescription(study.description || "");
    }
  }, [study]);

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
          <DialogTitle>Editar estudo</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu estudo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2 w-full">
          {success && <p className="successMsg">{success}</p>}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Nome</label>
            <input
              className="inputCustom w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="errorMsg">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Tipo</label>
            <select
              className="inputCustom w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="ferramenta">Ferramenta</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Link</label>
            <input
              className="inputCustom w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="inputCustom resize-none h-24 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN variant="outline" type="button"
              onClick={() => { setIsOpen(false), resetState() }}
              className="bg-gray-20 hover:bg-gray-30"
            >
              Cancelar
            </ButtonCN>
            <Button submit className={`${loading && 'pointer-events-none'}`}>
              {loading && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};