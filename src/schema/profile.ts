import z from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório"),
  username: z.string().min(3, "O usuário é obrigatório"),
  password: z.string().min(4, "Senha é obrigatória").optional().or(z.literal("")),
  profileImage: typeof window === 'undefined' 
    ? z.any().optional() 
    : z.instanceof(FileList).optional(),
});

export type EditProfileForm = z.infer<typeof editProfileSchema>;