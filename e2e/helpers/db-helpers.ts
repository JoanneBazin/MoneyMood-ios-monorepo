import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

export const createUserInDB = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      name: true,
      email: true,
      password: true,
    },
  });
};

export const deleteUserFromDB = async (email: string) => {
  await prisma.user.delete({
    where: { email },
  });
};
