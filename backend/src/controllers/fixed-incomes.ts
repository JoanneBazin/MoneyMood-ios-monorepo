import { NextFunction, Request, Response } from "express";
import {
  budgetEntrySelect,
  getParamsId,
  getUserId,
  HttpError,
  isPrismaRecordNotFound,
  normalizeDecimalFields,
  prisma,
} from "../lib";

export const addFixedIncomes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const data = req.body;
  const incomesArray = Array.isArray(data) ? data : [data];

  try {
    const fixedIncomes = await Promise.all(
      incomesArray.map((income) =>
        prisma.fixedIncome.create({
          data: {
            ...income,
            userId,
          },
          select: budgetEntrySelect,
        })
      )
    );

    return res.status(201).json(normalizeDecimalFields(fixedIncomes));
  } catch (error) {
    return next(error);
  }
};

export const getFixedIncomes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const allFixedIncomes = await prisma.fixedIncome.findMany({
      where: {
        userId,
      },
      select: budgetEntrySelect,
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(normalizeDecimalFields(allFixedIncomes));
  } catch (error) {
    return next(error);
  }
};

export const updateFixedIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const incomeId = getParamsId(req, next);
  if (!incomeId) return;

  const { name, amount } = req.body;

  try {
    const updatedFixedIncome = await prisma.fixedIncome.update({
      where: {
        id: incomeId,
        userId,
      },
      data: {
        name,
        amount,
      },
      select: budgetEntrySelect,
    });

    return res.status(200).json(normalizeDecimalFields(updatedFixedIncome));
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

export const deleteFixedIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const incomeId = getParamsId(req, next);
  if (!incomeId) return;

  try {
    const deletedEntry = await prisma.fixedIncome.delete({
      where: {
        id: incomeId,
        userId,
      },
      select: { id: true },
    });

    return res.status(200).json(deletedEntry);
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
