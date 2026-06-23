import { NextFunction, Request, Response } from "express";
import { HttpError } from "src/lib";

export const protectTestRoutes = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isProd =
    process.env.VERCEL_ENV === "production" ||
    (process.env.NODE_ENV === "production" &&
      process.env.VERCEL_ENV !== "preview");

  if (isProd) {
    return next(new HttpError(403, "Action interdite en production"));
  }

  const authHeader = req.get("Authorization");

  if (authHeader !== `Bearer ${process.env.E2E_TOKEN}`) {
    return next(
      new HttpError(401, "Non authorisé - Token E2E invalide ou manquant"),
    );
  }

  next();
};
