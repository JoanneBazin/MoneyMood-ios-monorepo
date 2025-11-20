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

export const addFixedCharges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const data = req.body;
  const chargesArray = Array.isArray(data) ? data : [data];

  try {
    const fixedCharges = await Promise.all(
      chargesArray.map((charge) =>
        prisma.fixedCharge.create({
          data: {
            ...charge,
            userId,
          },
          select: budgetEntrySelect,
        })
      )
    );

    return res.status(201).json(normalizeDecimalFields(fixedCharges));
  } catch (error) {
    return next(error);
  }
};

export const getFixedCharges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const allFixedCharges = await prisma.fixedCharge.findMany({
      where: {
        userId,
      },
      select: budgetEntrySelect,
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(normalizeDecimalFields(allFixedCharges));
  } catch (error) {
    return next(error);
  }
};

export const updateFixedCharge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const chargeId = getParamsId(req, next);
  if (!chargeId) return;

  const { name, amount } = req.body;

  try {
    const updatedFixedCharge = await prisma.fixedCharge.update({
      where: {
        id: chargeId,
        userId,
      },
      data: {
        name,
        amount,
      },
      select: budgetEntrySelect,
    });

    return res.status(200).json(normalizeDecimalFields(updatedFixedCharge));
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

export const deleteFixedCharge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const chargeId = getParamsId(req, next);
  if (!chargeId) return;

  try {
    const deletedEntry = await prisma.fixedCharge.delete({
      where: {
        id: chargeId,
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
