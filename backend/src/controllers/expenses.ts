import { NextFunction, Request, Response } from "express";
import {
  expenseEntrySelect,
  getMultipleParamsIds,
  getParamsId,
  HttpError,
  isPrismaForeignKeyConstraint,
  isPrismaRecordNotFound,
  normalizeDecimalFields,
  prisma,
} from "../lib";
import {
  updateMonthlyBudgetRemaining,
  updateSpecialBudgetRemaining,
} from "../services";

export const addExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const budgetId = getParamsId(req, next);
    if (!budgetId) return;

    if (!req.budgetType) {
      return next(new HttpError(500, "Budget type non résolu"));
    }
    const isMonthly = req.budgetType === "monthly";

    const data = req.body;
    const expensesArray = Array.isArray(data) ? data : [data];

    const categoryIds = [
      ...new Set(expensesArray.map((e) => e.specialCategoryId)),
    ].filter((id) => id !== undefined && id !== null);

    if (categoryIds.length > 0) {
      const validCategoriesCount = await prisma.specialBudgetCategory.count({
        where: {
          id: { in: categoryIds },
          specialBudgetId: budgetId,
        },
      });

      if (validCategoriesCount !== categoryIds.length) {
        return next(
          new HttpError(
            403,
            "Certaines catégories n'appartiennent pas à ce budget",
          ),
        );
      }
    }

    const newExpenses = await Promise.all(
      expensesArray.map((expense) =>
        prisma.expense.create({
          data: {
            ...expense,
            [isMonthly ? "monthlyBudgetId" : "specialBudgetId"]: budgetId,
          },
          select: expenseEntrySelect,
        }),
      ),
    );

    const { remainingBudget } = isMonthly
      ? await updateMonthlyBudgetRemaining(budgetId)
      : await updateSpecialBudgetRemaining(budgetId);

    return res.status(201).json({
      data: normalizeDecimalFields(newExpenses),
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaForeignKeyConstraint(error)) {
      return next(new HttpError(404, "Référence à un budget inexistant"));
    }
    return next(error);
  }
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = getMultipleParamsIds(req, ["id", "expenseId"], next);
    if (!params) return;
    const { id: budgetId, expenseId } = params;

    if (!req.budgetType) {
      return next(new HttpError(500, "Budget type non résolu"));
    }
    const isMonthly = req.budgetType === "monthly";

    const data = req.body;

    const categoryId = data.specialCategoryId;

    if (categoryId) {
      const validCategory = await prisma.specialBudgetCategory.findFirst({
        where: {
          id: categoryId,
          specialBudgetId: budgetId,
        },
      });

      if (!validCategory) {
        return next(
          new HttpError(403, "Cette catégorie n'appartient pas à ce budget"),
        );
      }
    }

    const updatedExpense = await prisma.expense.update({
      where: {
        id: expenseId,
        [isMonthly ? "monthlyBudgetId" : "specialBudgetId"]: budgetId,
      },
      data,
      select: expenseEntrySelect,
    });

    const { remainingBudget } = isMonthly
      ? await updateMonthlyBudgetRemaining(budgetId)
      : await updateSpecialBudgetRemaining(budgetId);

    return res.status(200).json({
      data: normalizeDecimalFields(updatedExpense),
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Dépense non trouvée ou vous n'avez pas les droits d'accès.",
        ),
      );
    }
    return next(error);
  }
};

export const updateExpenseValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const params = getMultipleParamsIds(req, ["id", "expenseId"], next);
  if (!params) return;
  const { id: budgetId, expenseId } = params;

  if (!req.budgetType) {
    return next(new HttpError(500, "Budget type non résolu"));
  }
  const isMonthly = req.budgetType === "monthly";

  const { cashed } = req.body;
  if (typeof cashed !== "boolean") {
    return next(new HttpError(400, "Valeur 'cashed' invalide"));
  }

  try {
    const updatedExpense = await prisma.expense.update({
      where: {
        id: expenseId,
        [isMonthly ? "monthlyBudgetId" : "specialBudgetId"]: budgetId,
      },
      data: {
        cashed,
        cashedAt: cashed ? new Date() : null,
      },
      select: expenseEntrySelect,
    });

    return res.status(200).json(normalizeDecimalFields(updatedExpense));
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Dépense non trouvée ou vous n'avez pas les droits d'accès.",
        ),
      );
    }
    return next(error);
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const params = getMultipleParamsIds(req, ["id", "expenseId"], next);
  if (!params) return;
  const { id: budgetId, expenseId } = params;

  if (!req.budgetType) {
    return next(new HttpError(500, "Budget type non résolu"));
  }
  const isMonthly = req.budgetType === "monthly";

  try {
    const deletedEntry = await prisma.expense.delete({
      where: {
        id: expenseId,
        [isMonthly ? "monthlyBudgetId" : "specialBudgetId"]: budgetId,
      },
      select: { id: true },
    });

    const { remainingBudget } = isMonthly
      ? await updateMonthlyBudgetRemaining(budgetId)
      : await updateSpecialBudgetRemaining(budgetId);

    return res.status(200).json({
      data: deletedEntry,
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Dépense non trouvée ou vous n'avez pas les droits d'accès.",
        ),
      );
    }
    return next(error);
  }
};
