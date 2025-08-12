import { NextFunction, Request, Response } from "express";

import {
  getParamsId,
  getUserId,
  HttpError,
  isPrismaRecordNotFound,
  isPrismaUniqueConstraint,
  monthlyBudgetSelect,
  normalizeDecimalFields,
  prisma,
} from "../lib";
import { calculateRemainingBudget, calculateWeeklyBudget } from "../services";
import { Prisma } from "../generated/prisma";

export const addMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const { month, year, isCurrent, incomes, charges, numberOfWeeks } = req.body;

  const remainingBudget = calculateRemainingBudget(incomes, charges);
  const weeklyBudget = calculateWeeklyBudget(remainingBudget, numberOfWeeks);

  try {
    const monthlyBudget = await prisma.$transaction(
      async (tx: Prisma.TransactionClient): Promise<any> => {
        const newBudget = await tx.monthlyBudget.create({
          data: {
            userId,
            month,
            year,
            isCurrent,
            remainingBudget,
            weeklyBudget,
            numberOfWeeks,
            incomes: {
              create: incomes,
            },
            charges: {
              create: charges,
            },
          },
          select: monthlyBudgetSelect,
        });

        if (isCurrent) {
          await tx.monthlyBudget.updateMany({
            where: {
              userId,
              id: { not: newBudget.id },
            },
            data: { isCurrent: false },
          });
        }

        return newBudget;
      }
    );

    return res.status(201).json(normalizeDecimalFields(monthlyBudget));
  } catch (error) {
    if (isPrismaUniqueConstraint(error)) {
      return next(
        new HttpError(400, "Un budget mensuel pour ce mois existe déjà")
      );
    }
    return next(error);
  }
};

export const getCurrentMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const currentMonthlyBudget = await prisma.monthlyBudget.findFirst({
      where: {
        userId,
        isCurrent: true,
      },
      select: monthlyBudgetSelect,
    });

    if (!currentMonthlyBudget) {
      return next(new HttpError(404, "Budget mensuel actif non trouvé"));
    }

    return res.status(200).json(normalizeDecimalFields(currentMonthlyBudget));
  } catch (error) {
    return next(error);
  }
};

export const getMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const { month, year } = req.query;

  try {
    const monthlyBudget = await prisma.monthlyBudget.findUnique({
      where: {
        userId_month_year: {
          userId,
          month: Number(month),
          year: Number(year),
        },
      },
      select: {
        id: true,
        year: true,
        month: true,
        remainingBudget: true,
      },
    });

    if (!monthlyBudget) {
      return next(new HttpError(404, "Budget mensuel non trouvé"));
    }

    return res.status(200).json(normalizeDecimalFields(monthlyBudget));
  } catch (error) {
    return next(error);
  }
};

export const getLastBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const history = await prisma.monthlyBudget.findMany({
      where: {
        userId,
        isCurrent: false,
      },
      orderBy: [{ year: "desc" }, { month: "desc" }],
      take: 6,
      select: {
        id: true,
        year: true,
        month: true,
        remainingBudget: true,
      },
    });

    if (!history) {
      return next(new HttpError(404, "Ancien budgets mensuels non trouvés"));
    }

    return res.status(200).json(normalizeDecimalFields(history));
  } catch (error) {
    return next(error);
  }
};

export const getMonthlyBudgetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const monthlyBudgetId = getParamsId(req, next);
  if (!monthlyBudgetId) return;

  try {
    const monthlyBudget = await prisma.monthlyBudget.findFirst({
      where: {
        userId,
        id: monthlyBudgetId,
      },
      select: monthlyBudgetSelect,
    });

    if (!monthlyBudget) {
      return next(new HttpError(404, "Budget mensuel non trouvé"));
    }

    return res.status(200).json(normalizeDecimalFields(monthlyBudget));
  } catch (error) {
    return next(error);
  }
};

export const updateMonthlyBudgetStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const monthlyBudgetId = getParamsId(req, next);
  if (!monthlyBudgetId) return;

  const { isCurrent } = req.body;

  try {
    if (isCurrent) {
      await prisma.monthlyBudget.updateMany({
        where: { userId },
        data: { isCurrent: false },
      });
    }

    const updatedBudget = await prisma.monthlyBudget.update({
      where: { id: monthlyBudgetId, userId },
      data: { isCurrent },
      select: monthlyBudgetSelect,
    });

    return res.status(200).json(normalizeDecimalFields(updatedBudget));
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Budget non trouvé ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};

export const deleteMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const monthlyBudgetId = getParamsId(req, next);
  if (!monthlyBudgetId) return;

  try {
    await prisma.monthlyBudget.delete({
      where: {
        id: monthlyBudgetId,
        userId,
      },
    });

    return res
      .status(200)
      .json({ message: "Budget mensuel supprimé avec succès !" });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Budget mensuel non trouvé ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};
