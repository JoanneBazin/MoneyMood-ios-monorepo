-- AlterTable
ALTER TABLE "User" ADD COLUMN     "enabledExpenseValidation" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WeeklyExpense" ADD COLUMN     "cashed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cashedAt" TIMESTAMP(3);
