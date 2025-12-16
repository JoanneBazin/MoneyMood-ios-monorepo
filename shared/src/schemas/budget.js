"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = exports.specialBudgetSchema = exports.queryDateSchema = exports.updateCurrentStatusSchema = exports.monthlyBudgetServerSchema = exports.monthlyBudgetSchema = exports.expenseServerSchema = exports.expenseSchema = exports.specialExpenseServerSchema = exports.specialExpenseSchema = exports.baseEntryServerSchema = exports.baseEntrySchema = void 0;
const zod_1 = require("zod");
exports.baseEntrySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1, "Le nom est requis")
        .max(50, "Le nom est trop long"),
    amount: zod_1.z.string().pipe(zod_1.z
        .string()
        .min(1, "Le montant est requis")
        .transform((val) => {
        const cleaned = val.trim().replace(/\s+/g, "").replace(",", ".");
        return Math.round(Number(cleaned) * 100) / 100;
    })
        .pipe(zod_1.z
        .number()
        .refine((val) => !isNaN(val) && val > 0, "Veuillez saisir un montant positif valide"))),
});
exports.baseEntryServerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1, "Le nom est requis")
        .max(50, "Le nom est trop long"),
    amount: zod_1.z.number().positive("Montant positif requis"),
});
exports.specialExpenseSchema = exports.baseEntrySchema.extend({
    specialCategoryId: zod_1.z.preprocess((val) => {
        if (typeof val === "string") {
            const cat = val.trim();
            return cat === "" ? null : cat;
        }
        return val;
    }, zod_1.z.string().nullable().optional()),
});
exports.specialExpenseServerSchema = exports.baseEntryServerSchema.extend({
    specialCategoryId: zod_1.z.string().nullable().optional(),
});
exports.expenseSchema = exports.baseEntrySchema.extend({
    weekNumber: zod_1.z.number().min(1).max(5),
});
exports.expenseServerSchema = exports.baseEntryServerSchema.extend({
    weekNumber: zod_1.z.number().min(1).max(5),
});
exports.monthlyBudgetSchema = zod_1.z.object({
    month: zod_1.z
        .number()
        .min(1, "Le mois doit être compris entre 1 et 12")
        .max(12, "Le mois doit être compris entre 1 et 12"),
    year: zod_1.z.number().min(2025, "L'année doit être supérieure ou égale à 2025"),
    isCurrent: zod_1.z.boolean(),
    numberOfWeeks: zod_1.z.number().min(4).max(5),
    incomes: zod_1.z.array(exports.baseEntrySchema).default([]),
    charges: zod_1.z.array(exports.baseEntrySchema).default([]),
});
exports.monthlyBudgetServerSchema = exports.monthlyBudgetSchema.extend({
    incomes: zod_1.z.array(exports.baseEntryServerSchema).default([]),
    charges: zod_1.z.array(exports.baseEntryServerSchema).default([]),
});
exports.updateCurrentStatusSchema = exports.monthlyBudgetSchema.pick({
    isCurrent: true,
});
exports.queryDateSchema = zod_1.z.object({
    month: zod_1.z.coerce.number().min(1).max(12),
    year: zod_1.z.coerce.number().min(2025),
});
exports.specialBudgetSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Le nom est trop court")
        .max(30, "Le nom est trop long")
        .trim(),
    totalBudget: zod_1.z.preprocess((val) => {
        if (typeof val === "string") {
            const cleaned = val.trim().replace(/\s+/g, "").replace(",", ".");
            return Math.round(Number(cleaned) * 100) / 100;
        }
        return val;
    }, zod_1.z
        .number()
        .refine((val) => !isNaN(val) && val > 0, "Veuillez saisir un montant positif valide")),
});
exports.categorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Le nom de catégorie est trop court")
        .max(30, "Le nom de catégorie est trop long")
        .trim(),
});
