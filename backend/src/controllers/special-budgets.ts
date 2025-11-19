import { NextFunction, Request, Response } from "express";

import {
  getParamsId,
  getUserId,
  HttpError,
  isPrismaRecordNotFound,
  normalizeDecimalFields,
  prisma,
  specialExpenseEntrySelect,
} from "../lib";
import { updateSpecialBudgetRemaining } from "src/services";

export const addSpecialBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserId(req, next);
    if (!userId) return;

    const { name, totalBudget } = req.body;

    const newBudget = await prisma.specialBudget.create({
      data: {
        userId,
        name,
        totalBudget,
        remainingBudget: totalBudget,
      },
    });

    return res.status(201).json(normalizeDecimalFields(newBudget));
  } catch (error) {
    return next(error);
  }
};

export const getSpecialBudgetDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserId(req, next);
    if (!userId) return;

    const id = getParamsId(req, next);
    if (!id) return;

    const specialBudget = await prisma.specialBudget.findUnique({
      where: {
        userId,
        id,
      },
      include: {
        categories: {
          include: { expenses: { select: specialExpenseEntrySelect } },
        },
        expenses: {
          where: { specialCategoryId: null },
          select: specialExpenseEntrySelect,
        },
      },
    });

    if (!specialBudget) {
      return next(new HttpError(404, "Budget introuvable"));
    }

    return res.status(200).json(normalizeDecimalFields(specialBudget));
  } catch (error) {
    return next(error);
  }
};

export const getAllSpecialBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const specialBudgets = await prisma.specialBudget.findMany({
      where: {
        userId,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    if (!specialBudgets) {
      return next(new HttpError(404, "Aucun budget créé"));
    }

    return res.status(200).json(normalizeDecimalFields(specialBudgets));
  } catch (error) {
    return next(error);
  }
};

export const updateSpecialBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const specialBudgetId = getParamsId(req, next);
  if (!specialBudgetId) return;

  try {
    const { name, totalBudget } = req.body;

    const budget = await prisma.specialBudget.update({
      where: {
        id: specialBudgetId,
        userId,
      },
      data: {
        name,
        totalBudget,
      },
      include: {
        expenses: {
          select: specialExpenseEntrySelect,
        },
      },
    });
    const { remainingBudget } = await updateSpecialBudgetRemaining(budget.id);
    const updatedBudget = { ...budget, remainingBudget };

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

export const deleteSpecialBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const specialBudgetId = getParamsId(req, next);
  if (!specialBudgetId) return;

  try {
    await prisma.specialBudget.delete({
      where: {
        id: specialBudgetId,
        userId,
      },
    });

    return res.status(200).json({ message: "Budget supprimé avec succès !" });
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
