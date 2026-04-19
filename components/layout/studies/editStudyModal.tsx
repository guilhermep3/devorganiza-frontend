"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { Study } from "@/src/types/study";
import { useEffect, useState } from "react";
import { useEditStudy } from "@/src/api/study/useEditStudy";
import { setorTypes } from "@/src/types/setor";
import { useModalHandlers } from "@/src/hooks/useModalHandlers";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  study: Study;
  refetch: () => void;
};

export const EditStudyModal = ({ isOpen, setIsOpen, study, refetch }: Props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const { handleSubmit, isPending, isSuccess, error, errors, setErrors } =
    useEditStudy(study?.id, {
      onSuccess: () => {
        setIsOpen(false);
        refetch();
      }
    });

  useEffect(() => {
    if (study) {
      setName(study.name ?? "");
      setType(study.type ?? "");
      setLink(study.link ?? "");
      setDescription(study.description ?? "");
    }
  }, [isOpen, study]);

  const { handleOpenChange, handleCancel } = useModalHandlers({ setIsOpen, setErrors, refetch });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="ds-dialog-content">
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
          {error && <p className="ds-message-error">{error.message}</p>}
          {isSuccess && <p className="ds-message-success">Estudo atualizado com sucesso</p>}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nome</label>
            <input className="ds-input w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="ds-message-error">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tipo</label>
            <select className="ds-input w-full"
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
            {errors.type && (
              <p className="ds-message-error">{errors.type}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Link</label>
            <input className="ds-input w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            {errors.link && (
              <p className="ds-message-error">{errors.link}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Descrição</label>
            <textarea className="ds-input w-full resize-none h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <ButtonCN variant="outline" type="button"
              onClick={handleCancel}
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
