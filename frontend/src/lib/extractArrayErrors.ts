export const extractArrayErrors = (
  errors: Record<string, string>,
  prefix: string
): Record<string, string>[] => {
  const result: Record<string, string>[] = [{}];

  Object.entries(errors).forEach(([key, message]) => {
    if (key.startsWith(prefix)) {
      const parts = key.split(".");
      const index = parseInt(parts[1], 10);
      const field = parts[2];
      result[index] = { ...result[index], [field]: message };
    }
  });
  return result;
};
