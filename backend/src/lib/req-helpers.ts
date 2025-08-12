import { Request, NextFunction } from "express";
import { HttpError } from "./HttpError";

export const getUserId = (req: Request, next: NextFunction) => {
  const userId = req.user?.id;
  if (!userId) {
    return next(new HttpError(401, "Utilisateur non authentifié"));
  }
  return userId;
};

export const getParamsId = (req: Request, next: NextFunction) => {
  const paramsId = req.params.id;
  if (!paramsId) {
    return next(new HttpError(400, "Id manquant dans la requête"));
  }
  return paramsId;
};

export const getMultipleParamsIds = (
  req: Request,
  keys: string[],
  next: NextFunction
): void | Record<string, string> => {
  const ids: Record<string, string> = {};

  for (const key of keys) {
    const value = req.params[key];
    if (!value) {
      return next(new HttpError(400, "Id manquant dans la requête"));
    }
    ids[key] = value;
  }

  return ids;
};
