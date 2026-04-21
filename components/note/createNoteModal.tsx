import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../button";
import { FormEvent } from "react";

type Props = {
  isCreating: boolean;
  setIsCreating: (value: boolean) => void;
  noteName: string;
  setNoteName: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: { name: string }) => void;
  errors: { name?: string; };
  isPending: boolean;
};
export const CreateNoteModal = ({
  isCreating, setIsCreating, handleSubmit, noteName, setNoteName, errors, isPending,
}: Props) => {
  return (
    <Dialog
      open={isCreating}
      onOpenChange={(open) => setIsCreating(open)}
    >
      <DialogContent className="ds-dialog-content">
        <DialogHeader>
          <DialogTitle>Nova anotação</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => handleSubmit(e, { name: noteName })}
          className="flex flex-col gap-4"
        >
          <div className="ds-field-form-group">
            <label className="ds-text-sm font-medium text-gray-70 dark:text-gray-70">
              Nome
            </label>

            <input
              autoFocus
              type="text"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              placeholder="Ex: Anotações de JavaScript"
              className="ds-input"
            />

            {errors.name && (
              <p className="ds-message-error">{errors.name}</p>
            )}
          </div>

          <DialogFooter>
            <Button submit className="mx-auto" size={2}>
              {isPending ? "Criando..." : "Criar e abrir"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};