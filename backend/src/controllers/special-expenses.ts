import { NextFunction, Request, Response } from "express";
import {
  getMultipleParamsIds,
  getParamsId,
  HttpError,
  isPrismaForeignKeyConstraint,
  isPrismaRecordNotFound,
  normalizeDecimalFields,
  prisma,
  specialExpenseEntrySelect,
} from "../lib";
import { updateSpecialBudgetRemaining } from "../services";

export const addSpecialExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const specialBudgetId = getParamsId(req, next);
    if (!specialBudgetId) return;

    const data = req.body;
    const expensesArray = Array.isArray(data) ? data : [data];

    const specialExpenses = await Promise.all(
      expensesArray.map((expense) =>
        prisma.expense.create({
          data: {
            ...expense,
            specialBudgetId,
          },
          select: specialExpenseEntrySelect,
        })
      )
    );

    const { remainingBudget } = await updateSpecialBudgetRemaining(
      specialBudgetId
    );

    return res.status(201).json({
      expenses: normalizeDecimalFields(specialExpenses),
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaForeignKeyConstraint(error)) {
      return next(
        new HttpError(
          404,
          "Référence à un budget inexistant ou catégorie introuvable"
        )
      );
    }
    return next(error);
  }
};

export const updateSpecialExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = getMultipleParamsIds(req, ["id", "expenseId"], next);
    if (!params) return;

    const { id: specialBudgetId, expenseId } = params;

    const data = req.body;
    const updatedExpense = await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data,
      select: specialExpenseEntrySelect,
    });

    const { remainingBudget } = await updateSpecialBudgetRemaining(
      specialBudgetId
    );

    return res.status(200).json({
      updatedExpense: normalizeDecimalFields(updatedExpense),
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Dépense non trouvée ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};

export const deleteSpecialExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "expenseId"], next);
  if (!params) return;
  const { id: specialBudgetId, expenseId } = params;

  try {
    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });

    const { remainingBudget } = await updateSpecialBudgetRemaining(
      specialBudgetId
    );

    return res.status(200).json({
      message: "Dépense supprimée avec succès !",
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Dépense non trouvée ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};
