"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email("Format d'email invalide").toLowerCase().trim(),
    password: zod_1.z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(100, "Le mot de passe est trop long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/, "Le mot de passe doit contenir au moins : une minuscule, une majuscule et un chiffre"),
    name: zod_1.z
        .string()
        .trim()
        .nonempty("Le nom est requis")
        .max(100, "Le nom est trop long")
        .refine((val) => /^[a-zA-ZÀ-ÿ\s'-]*$/.test(val), "Le nom contient des caractères invalides"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Format d'email invalide")
        .min(1, "Email requis")
        .toLowerCase()
        .trim(),
    password: zod_1.z.string().min(1, "Le mot de passe est requis"),
});
