import { PrismaClient } from "@prisma/client";

module.exports = async () => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  await prisma.user.deleteMany();
  await prisma.$disconnect();
};
