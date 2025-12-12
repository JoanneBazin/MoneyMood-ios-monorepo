import app from "./src/app";
import { prisma } from "./src/lib";

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Test server listening on http://localhost:${PORT}`);
  console.log(`🗄️  Database: ${process.env.DATABASE_URL?.split("/").pop()}\n`);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing server...");
  server.close(() => {
    console.log("Server off");
  });
  await prisma.$disconnect();
  process.exit(0);
});
process.on("SIGINT", async () => {
  console.log("SIGINT received, closing server...");
  server.close(() => {
    console.log("Server off");
  });
  await prisma.$disconnect();
  process.exit(0);
});
