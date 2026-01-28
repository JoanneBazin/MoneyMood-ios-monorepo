import { NextFunction, Request, Response } from "express";
import { getUserId, HttpError, prisma, userSelect } from "../lib";

export const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = getUserId(req, next);
  if (!userId) return;
  const allowedFields = ["name", "email", "enabledExpenseValidation"];

  try {
    const updates: any = {};
    for (const key of Object.keys(req.body)) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    if (updates.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: updates.email },
      });
      if (existingUser && existingUser.id !== userId) {
        return next(new HttpError(400, "Cet email est déjà utilisé"));
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updates,
      select: userSelect,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
