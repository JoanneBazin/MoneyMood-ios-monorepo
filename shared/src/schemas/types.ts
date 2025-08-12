export type ValidationResult<T> =
  | { success: true; errors: null; data: T }
  | { success: false; errors: Record<string, string>; data: null };

export type ArrayValidationResult<T> =
  | { success: true; errors: null; data: T[] }
  | {
      success: false;
      errors: Record<number, Record<string, string>>;
      data: null;
    };
