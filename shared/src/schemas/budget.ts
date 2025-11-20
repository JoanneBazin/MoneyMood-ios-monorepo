import { z } from "zod";

export const baseEntrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom est requis")
    .max(50, "Le nom est trop long"),

  amount: z.string().pipe(
    z
      .string()
      .min(1, "Le montant est requis")
      .transform((val) => {
        const cleaned = val.trim().replace(/\s+/g, "").replace(",", ".");
        return Math.round(Number(cleaned) * 100) / 100;
      })
      .pipe(
        z
          .number()
          .refine(
            (val) => !isNaN(val) && val > 0,
            "Veuillez saisir un montant positif valide"
          )
      )
  ),
});

export const baseEntryServerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom est requis")
    .max(50, "Le nom est trop long"),
  amount: z.number().positive("Montant positif requis"),
});
export type BaseEntryForm = z.input<typeof baseEntrySchema>;
export type BaseEntryOutput = z.output<typeof baseEntrySchema>;

export const specialExpenseSchema = baseEntrySchema.extend({
  specialCategoryId: z.preprocess((val) => {
    if (typeof val === "string") {
      const cat = val.trim();
      return cat === "" ? null : cat;
    }
    return val;
  }, z.string().nullable().optional()),
});
export const specialExpenseServerSchema = baseEntryServerSchema.extend({
  specialCategoryId: z.string().nullable().optional(),
});
export type SpecialExpenseOutput = z.output<typeof specialExpenseSchema>;

export const expenseSchema = baseEntrySchema.extend({
  weekNumber: z.number().min(1).max(5),
});
export const expenseServerSchema = baseEntryServerSchema.extend({
  weekNumber: z.number().min(1).max(5),
});
export type ExpenseOutput = z.output<typeof expenseSchema>;

export const monthlyBudgetSchema = z.object({
  month: z
    .number()
    .min(1, "Le mois doit être compris entre 1 et 12")
    .max(12, "Le mois doit être compris entre 1 et 12"),
  year: z.number().min(2025, "L'année doit être supérieure ou égale à 2025"),
  isCurrent: z.boolean(),
  numberOfWeeks: z.number().min(4).max(5),
  incomes: z.array(baseEntrySchema).default([]),
  charges: z.array(baseEntrySchema).default([]),
});
export type MonthlyBudgetForm = z.infer<typeof monthlyBudgetSchema>;

export const updateCurrentStatusSchema = monthlyBudgetSchema.pick({
  isCurrent: true,
});

export const queryDateSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2025),
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
export type SpecialBudgetForm = z.infer<typeof specialBudgetSchema>;

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom de catégorie est trop court")
    .max(30, "Le nom de catégorie est trop long")
    .trim(),
});
export type CategoryEntryForm = z.infer<typeof categorySchema>;
