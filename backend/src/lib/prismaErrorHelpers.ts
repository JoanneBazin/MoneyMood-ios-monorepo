export const isPrismaRecordNotFound = (error: unknown): boolean => {
  return (
    error instanceof Error &&
    error.constructor.name === "PrismaClientKnownRequestError" &&
    (error as any).code === "P2025"
  );
};

export const isPrismaUniqueConstraint = (error: unknown): boolean => {
  return (
    error instanceof Error &&
    error.constructor.name === "PrismaClientKnownRequestError" &&
    (error as any).code === "P2002"
  );
};

export const isPrismaForeignKeyConstraint = (error: unknown): boolean => {
  return (
    error instanceof Error &&
    error.constructor.name === "PrismaClientKnownRequestError" &&
    (error as any).code === "P2003"
  );
};
