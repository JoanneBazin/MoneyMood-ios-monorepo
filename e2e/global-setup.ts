import { PrismaClient } from "@prisma/client";

async function globalSetup() {
  const dbUrl = process.env.DATABASE_URL;

  const prisma = new PrismaClient({ datasourceUrl: dbUrl });
  console.log(dbUrl);

  try {
    await prisma.user.deleteMany({});
    console.log("✅ Users deleted from DB");
  } catch (err) {
    console.log("❌ Users deletion failed");
    throw err;
  } finally {
    prisma.$disconnect();
  }
}

export default globalSetup;
