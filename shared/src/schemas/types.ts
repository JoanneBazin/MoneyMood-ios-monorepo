import z, { ZodTypeAny } from "zod";

export type ValidationResult<T extends ZodTypeAny> =
  | { success: true; errors: null; data: z.infer<T> }
  | { success: false; errors: Record<string, string>; data: null };

export type ArrayValidationResult<T extends ZodTypeAny> =
  | { success: true; errors: null; data: z.infer<T>[] }
  | {
      success: false;
      errors: Record<number, Record<string, string>>;
      data: null;
    };
