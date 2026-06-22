import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const isPrismaRecordNotFound = (error: unknown): boolean => {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === "P2025"
  );
};

export const isPrismaUniqueConstraint = (error: unknown): boolean => {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === "P2002"
  );
};

export const isPrismaForeignKeyConstraint = (error: unknown): boolean => {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === "P2003"
  );
};
