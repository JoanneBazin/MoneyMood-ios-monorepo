import { NextFunction, Request, Response } from "express";
import {
  getMultipleParamsIds,
  getParamsId,
  getUserId,
  HttpError,
  isPrismaRecordNotFound,
  normalizeDecimalFields,
  prisma,
  specialExpenseEntrySelect,
} from "../lib";
import { updateSpecialBudgetRemaining } from "../services";

export const addSpecialCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const specialBudgetId = getParamsId(req, next);
  if (!specialBudgetId) return;

  try {
    const { name } = req.body;

    const specialBudget = await prisma.specialBudget.findUnique({
      where: {
        userId,
        id: specialBudgetId,
      },
    });

    if (!specialBudget) {
      return next(
        new HttpError(
          404,
          "Budget non trouvé ou vous n'avez pas les droits d'accès."
        )
      );
    }

    const newCategory = await prisma.specialBudgetCategory.create({
      data: {
        name,
        specialBudget: {
          connect: {
            id: specialBudgetId,
          },
        },
      },
      include: { expenses: { select: specialExpenseEntrySelect } },
    });

    return res.status(201).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

export const updateSpecialCategoryName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "categoryId"], next);
  if (!params) return;

  const { id: specialBudgetId, categoryId } = params;

  const { name } = req.body;

  try {
    const updatedCategory = await prisma.specialBudgetCategory.update({
      where: { id: categoryId, specialBudgetId },
      data: { name },
      include: { expenses: { select: specialExpenseEntrySelect } },
    });

    return res.status(200).json(updatedCategory);
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

export const deleteSpecialCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "categoryId"], next);
  if (!params) return;

  const { id: specialBudgetId, categoryId } = params;

  try {
    const deletedCategory = await prisma.specialBudgetCategory.delete({
      where: { id: categoryId, specialBudgetId },
      select: { id: true, expenses: { select: specialExpenseEntrySelect } },
    });

    return res.status(200).json(deletedCategory);
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

export const deleteSpecialCategoryOnCascade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "categoryId"], next);
  if (!params) return;

  const { id: specialBudgetId, categoryId } = params;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.expense.deleteMany({
        where: { specialBudgetId, specialCategoryId: categoryId },
      });

      await tx.specialBudgetCategory.delete({
        where: { id: categoryId, specialBudgetId },
      });
    });

    const { remainingBudget } = await updateSpecialBudgetRemaining(
      specialBudgetId
    );

    return res
      .status(200)
      .json({ remainingBudget: normalizeDecimalFields(remainingBudget) });
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
