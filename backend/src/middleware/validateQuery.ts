import { validateWithSchema } from "shared";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../lib";
import z from "zod";

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validateWithSchema(schema, req.query);

    if (!result.success) {
      return next(
        new HttpError(
          400,
          `Erreur dans la validation des données : ${JSON.stringify(
            result.errors
          )}`
        )
      );
    }

    next();
  };
};
