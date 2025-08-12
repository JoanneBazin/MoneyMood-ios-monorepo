import { NextFunction, Request, Response } from "express";
import {
  budgetEntrySelect,
  getMultipleParamsIds,
  getParamsId,
  HttpError,
  isPrismaForeignKeyConstraint,
  isPrismaRecordNotFound,
  normalizeDecimalFields,
  prisma,
} from "../lib";
import { updateMonthlyBudgetRemaining, updateWeeklyBudget } from "../services";

export const addMonthlyIncomes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const monthlyBudgetId = getParamsId(req, next);
  if (!monthlyBudgetId) return;

  const data = req.body;
  const incomesArray = Array.isArray(data) ? data : [data];

  try {
    const monthlyIncomes = await Promise.all(
      incomesArray.map((income) =>
        prisma.monthlyIncome.create({
          data: {
            ...income,
            monthlyBudgetId,
          },
          select: budgetEntrySelect,
        })
      )
    );

    const { weeklyBudget } = await updateWeeklyBudget(monthlyBudgetId);
    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res.status(201).json({
      incomes: normalizeDecimalFields(monthlyIncomes),
      weeklyBudget: normalizeDecimalFields(weeklyBudget),
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaForeignKeyConstraint(error)) {
      return next(new HttpError(404, "Référence à un budget inexistant"));
    }
    return next(error);
  }
};

export const updateMonthlyIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "incomeId"], next);
  if (!params) return;
  const { id: monthlyBudgetId, incomeId } = params;

  const { name, amount } = req.body;

  try {
    const updatedIncome = await prisma.monthlyIncome.update({
      where: {
        id: incomeId,
      },
      data: {
        name,
        amount,
      },
      select: budgetEntrySelect,
    });

    const { weeklyBudget } = await updateWeeklyBudget(monthlyBudgetId);
    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res.status(200).json({
      updatedIncome: normalizeDecimalFields(updatedIncome),
      weeklyBudget: normalizeDecimalFields(weeklyBudget),
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Revenu non trouvé ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};

export const deleteMonthlyIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "incomeId"], next);
  if (!params) return;
  const { id: monthlyBudgetId, incomeId } = params;

  try {
    await prisma.monthlyIncome.delete({
      where: {
        id: incomeId,
      },
    });

    const { weeklyBudget } = await updateWeeklyBudget(monthlyBudgetId);
    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res.status(200).json({
      message: "Revenu supprimé avec succès !",
      weeklyBudget: normalizeDecimalFields(weeklyBudget),
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Revenu non trouvé ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};
