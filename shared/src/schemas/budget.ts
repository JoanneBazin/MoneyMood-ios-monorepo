import { z } from "zod";

export const baseEntrySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, "Le nom est requis")
    .max(50, "Le nom est trop long"),

  amount: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const cleaned = val.trim().replace(/\s+/g, "").replace(",", ".");
        return Math.round(Number(cleaned) * 100) / 100;
      }
      return val;
    },
    z
      .number()
      .refine(
        (val) => !isNaN(val) && val > 0,
        "Veuillez saisir un montant positif valide"
      )
  ),
});

export const budgetEntrySchema = baseEntrySchema.extend({
  id: z.string(),
});
export const updateExpenseEntrySchema = budgetEntrySchema.extend({
  specialCategoryId: z.preprocess((val) => {
    if (typeof val === "string") {
      const cat = val.trim();
      return cat === "" ? null : cat;
    }
    return val;
  }, z.string().nullable().optional()),
});

export const expenseEntrySchema = baseEntrySchema.extend({
  weekNumber: z.number().min(1).max(5),
  specialCategoryId: z.string().optional(),
});

export const specialExpenseEntrySchema = expenseEntrySchema.omit({
  weekNumber: true,
});

export const monthlyBudgetSchema = z.object({
  month: z
    .number()
    .min(1, "Le mois doit être compris entre 1 et 12")
    .max(12, "Le mois doit être compris entre 1 et 12"),
  year: z.number().min(2025, "L'année doit être supérieure ou égale à 2025"),
  isCurrent: z.boolean(),
  numberOfWeeks: z.number().min(4).max(5),
  incomes: z.array(budgetEntrySchema).default([]),
  charges: z.array(budgetEntrySchema).default([]),
});

export const specialBudgetSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom est trop court")
    .max(30, "Le nom est trop long")
    .trim(),
  totalBudget: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const cleaned = val.trim().replace(/\s+/g, "").replace(",", ".");
        return Math.round(Number(cleaned) * 100) / 100;
      }
      return val;
    },
    z
      .number()
      .refine(
        (val) => !isNaN(val) && val > 0,
        "Veuillez saisir un montant positif valide"
      )
  ),
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom de catégorie est trop court")
    .max(30, "Le nom de catégorie est trop long")
    .trim(),
});

export const updateCategorySchema = categorySchema.extend({
  id: z.string(),
});

export const queryDateSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2025),
});

export const updateCurrentStatusSchema = z.object({
  isCurrent: z.boolean(),
});

export type BaseEntry = z.infer<typeof baseEntrySchema>;
export type BudgetEntryForm = z.infer<typeof budgetEntrySchema>;
export type ExpenseEntryForm = z.infer<typeof expenseEntrySchema>;
export type SpecialExpenseEntryForm = z.infer<typeof specialExpenseEntrySchema>;

export type MonthlyBudgetForm = z.infer<typeof monthlyBudgetSchema>;
export type SpecialBudgetForm = z.infer<typeof specialBudgetSchema>;

export type CategoryFormProps = z.infer<typeof categorySchema>;
export type UpdateCategoryFormProps = z.infer<typeof updateCategorySchema>;
