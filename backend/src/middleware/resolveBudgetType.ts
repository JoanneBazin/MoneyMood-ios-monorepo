import { NextFunction, Request, Response } from "express";
import { HttpError } from "src/lib";

export const resolveBudgetType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.baseUrl.includes("monthly-budgets")) {
    req.budgetType = "monthly";
  } else if (req.baseUrl.includes("special-budgets")) {
    req.budgetType = "special";
  } else {
    return next(new HttpError(400, "Type de budget invalide"));
  }

  next();
};
