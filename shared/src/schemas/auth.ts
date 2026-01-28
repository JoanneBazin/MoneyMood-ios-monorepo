import { z } from "zod";

const authBaseSchema = z.object({
  email: z
    .string()
    .email("Format d'email invalide")
    .min(1, "Email requis")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(100, "Le mot de passe est trop long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/,
      "Le mot de passe doit contenir au moins : une minuscule, une majuscule et un chiffre",
    ),
});

export const signupSchema = authBaseSchema.extend({
  name: z
    .string()
    .trim()
    .nonempty("Le nom est requis")
    .max(100, "Le nom est trop long")
    .refine(
      (val) => /^[a-zA-ZÀ-ÿ\s'-]*$/.test(val),
      "Le nom contient des caractères invalides",
    ),
});

export const loginSchema = authBaseSchema;

export const updateUserSchema = signupSchema
  .pick({
    name: true,
    email: true,
  })
  .partial()
  .extend({
    enabledExpenseValidation: z.boolean().optional(),
  });

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
