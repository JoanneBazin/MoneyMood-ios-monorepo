import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { HttpError } from "../lib";
import { validateInput } from "@moneymood-monorepo/shared";

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validateInput(schema, req.body);

    if (!result.success) {
      const errorMessage = Array.isArray(req.body)
        ? `Erreurs de validation : ${JSON.stringify(result.errors)}`
        : `Erreur dans la validation des données : ${JSON.stringify(
            result.errors
          )}`;

      return next(new HttpError(400, errorMessage));
    }

    req.body = result.data;
    next();
  };
};
