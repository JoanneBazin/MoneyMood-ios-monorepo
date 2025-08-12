import { z } from "zod";
import { ArrayValidationResult, ValidationResult } from "./types";

export * from "./auth";
export * from "./budget";

export const validateWithSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.reduce((acc, error) => {
      const path = error.path.join(".");
      acc[path] = error.message;
      return acc;
    }, {} as Record<string, string>);

    return {
      success: false,
      errors,
      data: null as null,
    };
  }

  return {
    success: true,
    errors: null,
    data: result.data,
  };
};

export const validateArrayWithSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown[]
): ArrayValidationResult<T> => {
  const validateItems: T[] = [];
  const itemErrors: Record<number, Record<string, string>> = {};
  let hasError = false;

  data.forEach((item, index) => {
    const result = validateWithSchema(schema, item);

    if (!result.success) {
      itemErrors[index] = result.errors;
      hasError = true;
    } else {
      validateItems.push(result.data);
      itemErrors[index] = {};
    }
  });

  if (hasError) {
    return {
      success: false,
      errors: itemErrors,
      data: null as null,
    };
  }

  return {
    success: true,
    errors: null,
    data: validateItems,
  };
};

export const validateInput = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  if (Array.isArray(data)) {
    return validateArrayWithSchema(schema, data);
  }

  return validateWithSchema(schema, data);
};
