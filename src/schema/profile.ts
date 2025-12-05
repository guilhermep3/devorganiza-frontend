import z from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório"),
  username: z.string().min(3, "O usuário é obrigatório"),
  password: z.string().min(4, "Senha é obrigatória").optional().or(z.literal("")),
  profileImage: z.any().optional(),
});

export type EditProfileForm = z.infer<typeof editProfileSchema>;