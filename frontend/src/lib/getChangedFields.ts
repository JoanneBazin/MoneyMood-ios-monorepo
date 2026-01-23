export const getChangedFields = <T extends object>(
  initial: T,
  current: T,
): Partial<T> =>
  Object.keys(initial).reduce((acc, key) => {
    const typedKey = key as keyof T;
    if (initial[typedKey] !== current[typedKey]) {
      acc[typedKey] = current[typedKey];
    }
    return acc;
  }, {} as Partial<T>);
