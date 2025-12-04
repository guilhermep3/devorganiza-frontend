"use client"
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/passwordInput";
import { Button as ButtonCN } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { useUpdateProfile } from "@/src/api/useUpdateProfile";
import { EditProfileForm, editProfileSchema } from "@/src/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  defaultValues?: {
    name: string;
    username: string;
    password?: string;
    profileImageUrl?: string;
  }
};
export const EditProfileModal = ({ isEditing, setIsEditing, defaultValues }: Props) => {
  const [previewUrl, setPreviewUrl] = useState(defaultValues?.profileImageUrl || "");
  const { updateProfile, loading, success, error } = useUpdateProfile();

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      username: defaultValues?.username || "",
      password: defaultValues?.password || ""
    }
  })

  async function onSubmit(data: EditProfileForm) {
    const imageFile = data.profileImage?.[0];

    const result = await updateProfile({
      name: data.name,
      username: data.username,
      password: data.password,
      profileImage: imageFile
    });

    console.log("Dados enviados:", result);
    if (success) {
      setIsEditing(false);
    }
  }

  function handleImagePreview(file?: File) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edite seu perfil</DialogTitle>
          <DialogDescription>* Indica item obrigatório</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 max-w-96 mx-auto">
          <div className="flex flex-col gap-2 w-full">
            <Label>Foto de perfil</Label>
            <input type="file" id="imageInput"
              accept="image/"
              {...register("profileImage")}
              onChange={(e) => handleImagePreview(e.target.files?.[0])}
              className="hidden"
            />
            {previewUrl && (
              <label htmlFor="imageInput"
                className="group relative w-24 h-24 rounded-full overflow-hidden mt-2 mx-auto border cursor-pointer"
                title="Atualizar foto"
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover z-10 brightness-90 group-hover:brightness-75 transition"
                />
                <Camera className="absolute z-30 left-1/2 top-1/2 -translate-1/2 stroke-3 w-7 h-7 text-black" />
              </label>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Nome <span className="text-gray-40">*</span></Label>
            <input className="inputCustom text-base"
              placeholder="Seu nome"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Nome de usuário <span className="text-gray-40">*</span></Label>
            <input className="inputCustom text-base"
              placeholder="Seu nome de usuário"
              {...register("username")}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Senha <span className="text-gray-40">*</span></Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center gap-3 pt-4">
            <ButtonCN type="button"
              variant="outline" className="bg-red-600 hover:bg-red-700 text-white!"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </ButtonCN>
            <Button submit className="bg-main-30 hover:bg-main-20 text-white">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}