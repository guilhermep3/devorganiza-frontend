"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { Study } from "@/src/types/study";
import { useEffect, useState } from "react";
import { useEditStudy } from "@/src/api/study/useEditStudy";
import { setorTypes } from "@/src/types/setor";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  study: Study;
  refetch: () => void;
};

export const EditStudyModal = ({ isOpen, setIsOpen, study, refetch }: Props) => {
  const { handleSubmit, isPending, isSuccess, error, errors } = useEditStudy(study?.id);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (study) {
      setName(study.name ?? "");
      setType(study.type ?? "");
      setLink(study.link ?? "");
      setDescription(study.description ?? "");
    }
  }, [isOpen, study]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      refetch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="dialogContentStyle">
        <DialogHeader>
          <DialogTitle>Editar estudo</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu estudo.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 pt-2 w-full"
          onSubmit={(e) => {
            handleSubmit(e, { name, type, link, description })
          }}
        >
          {error && <p className="errorMsg">{error.message}</p>}
          {isSuccess && <p className="successMsg">Estudo atualizado com sucesso</p>}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nome</label>
            <input className="inputCustom w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="errorMsg">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tipo</label>
            <select className="inputCustom w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Selecione...</option>
              {setorTypes.map((setor) => (
                <option key={setor} value={setor}>
                  {setor.charAt(0).toUpperCase() + setor.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Link</label>
            <input className="inputCustom w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Descrição</label>
            <textarea className="inputCustom w-full resize-none h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN variant="outline" type="button"
              onClick={() => {
                setIsOpen(false);
                refetch();
              }}
            >
              Cancelar
            </ButtonCN>
            <Button submit
              className={isPending ? "pointer-events-none" : ""}
            >
              {isPending && (
                <Loader2 className="animate-spin mr-2 w-5 h-5" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
