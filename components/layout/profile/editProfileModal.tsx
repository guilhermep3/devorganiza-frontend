"use client"
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/passwordInput";
import { Button as ButtonCN } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { useEditUser } from "@/src/api/user/useEditUser";
import { EditProfileForm, editProfileSchema } from "@/src/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  isEditing: boolean;
  setIsOpen: (value: boolean) => void;
  fetchUser: () => void;
  defaultValues: {
    name: string;
    username: string;
    profileImage?: string;
  }
};
export const EditProfileModal = ({ isEditing, setIsOpen, fetchUser, defaultValues }: Props) => {
  const [previewUrl, setPreviewUrl] = useState(defaultValues?.profileImage || "/no-profile.webp");
  const { updateProfile, isPending, isSuccess, error } = useEditUser();

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      username: defaultValues?.username || "",
      password: ""
    }
  })

  async function onSubmit(data: EditProfileForm) {
    const imageFile = data.profileImage?.[0] ?? null;

    const textData = {
      name: data.name,
      username: data.username,
      password: data.password
    };

    await updateProfile({
      data: textData,
      defaults: defaultValues,
      imageFile
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      fetchUser();
    }, 2000);
    return () => clearTimeout(timer);
  }, [isSuccess])

  function handleImagePreview(file?: File) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  return (
    <Dialog open={isEditing} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-96 gap-6">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Edite as informações do seu perfil</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 w-full max-w-80 mx-auto">
          {error && <p className="errorMsg">{error.message}</p>}
          {isSuccess && <p className="successMsg">Usuário atualizado com sucesso</p>}
          <div className="flex flex-col items-center gap-3 w-full">
            <Label className="text-sm font-medium">Foto de perfil</Label>
            <input type="file"
              id="imageInput"
              accept="image/*"
              className="hidden"
              {...register("profileImage", {
                onChange: (e: any) => {
                  const file = e.target.files?.[0];
                  handleImagePreview(file);
                }
              })}
            />
            <label htmlFor="imageInput"
              className="group relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200
                cursor-pointer hover:border-main-30 transition-all duration-200 shadow-md hover:shadow-lg mx-auto"
              title="Atualizar foto"
            >
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover transition-all duration-200 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Nome</Label>
            <input className="inputCustom text-base"
              placeholder="Seu nome"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Nome de usuário</Label>
            <input className="inputCustom text-base"
              placeholder="Seu nome de usuário"
              {...register("username")}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Senha</Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center gap-3 pt-4">
            <ButtonCN variant="outline" type="button"
              className="bg-red-600 hover:bg-red-700 text-white!"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </ButtonCN>
            <Button submit className={`bg-main-30 hover:bg-main-20 text-white ${isPending && 'pointer-events-none'}`}>
              {isPending && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}