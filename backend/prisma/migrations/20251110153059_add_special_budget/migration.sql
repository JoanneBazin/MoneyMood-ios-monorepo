-- AlterTable
ALTER TABLE "WeeklyExpense" ADD COLUMN     "specialBudgetId" TEXT,
ALTER COLUMN "weekNumber" DROP NOT NULL,
ALTER COLUMN "monthlyBudgetId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SpecialBudget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalBudget" DECIMAL(10,2) NOT NULL,
    "remainingBudget" DECIMAL(10,2) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpecialBudget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SpecialBudget_userId_idx" ON "SpecialBudget"("userId");

-- CreateIndex
CREATE INDEX "WeeklyExpense_monthlyBudgetId_idx" ON "WeeklyExpense"("monthlyBudgetId");

-- CreateIndex
CREATE INDEX "WeeklyExpense_specialBudgetId_idx" ON "WeeklyExpense"("specialBudgetId");

-- AddForeignKey
ALTER TABLE "WeeklyExpense" ADD CONSTRAINT "WeeklyExpense_specialBudgetId_fkey" FOREIGN KEY ("specialBudgetId") REFERENCES "SpecialBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialBudget" ADD CONSTRAINT "SpecialBudget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
