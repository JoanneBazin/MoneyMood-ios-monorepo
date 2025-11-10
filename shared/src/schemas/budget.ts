import { z } from "zod";

export const budgetEntrySchema = z.object({
  id: z.string(),
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

export const createBudgetEntrySchema = budgetEntrySchema.omit({ id: true });

export const expenseEntrySchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, "Le nom est trop court")
    .max(50, "Le nom est trop long")
    .trim(),
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
  weekNumber: z.number().min(1).max(5),
  category: z
    .string()
    .min(2, "Le nom de catégorie est trop court")
    .max(20, "Le nom de catégorie est trop long")
    .trim()
    .optional(),
});

export const createExpenseEntrySchema = expenseEntrySchema.omit({ id: true });
export const specialExpenseEntrySchema = expenseEntrySchema.omit({
  weekNumber: true,
});
export const createSpecialExpenseEntrySchema = specialExpenseEntrySchema.omit({
  id: true,
});

export const monthlyBudgetSchema = z.object({
  id: z.string(),
  month: z
    .number()
    .min(1, "Le mois doit être compris entre 1 et 12")
    .max(12, "Le mois doit être compris entre 1 et 12"),
  year: z.number().min(2025, "L'année doit être supérieure ou égale à 2025"),
  isCurrent: z.boolean(),
  remainingBudget: z.number(),
  weeklyBudget: z.number(),
  numberOfWeeks: z.number().min(4).max(5),
  incomes: z.array(budgetEntrySchema).default([]),
  charges: z.array(budgetEntrySchema).default([]),
  expenses: z.array(expenseEntrySchema).default([]),
});

export const createMonthlyBudgetSchema = monthlyBudgetSchema
  .omit({
    id: true,
    weeklyBudget: true,
    remainingBudget: true,
  })
  .extend({
    incomes: z.array(createBudgetEntrySchema).default([]),
    charges: z.array(createBudgetEntrySchema).default([]),
  });

export const specialBudgetSchema = z.object({
  id: z.string(),
  name: z.string(),
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
  remainingBudget: z.number(),
  expenses: z.array(expenseEntrySchema.omit({ weekNumber: true })).default([]),
});

export const createSpecialBudgetSchema = specialBudgetSchema.pick({
  name: true,
  totalBudget: true,
});

export const queryDateSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2025),
});

export const updateCurrentStatusSchema = z.object({
  isCurrent: z.boolean(),
});

export type BudgetEntry = z.infer<typeof budgetEntrySchema>;
export type BudgetEntryForm = z.infer<typeof createBudgetEntrySchema>;

export type ExpenseEntry = z.infer<typeof expenseEntrySchema>;
export type ExpenseEntryForm = z.infer<typeof createExpenseEntrySchema>;

export type MonthlyBudget = z.infer<typeof monthlyBudgetSchema>;
export type MonthlyBudgetForm = z.infer<typeof createMonthlyBudgetSchema>;

export type SpecialBudget = z.infer<typeof specialBudgetSchema>;
export type SpecialBudgetForm = z.infer<typeof createSpecialBudgetSchema>;
