/*
  Warnings:

  - You are about to drop the column `category` on the `WeeklyExpense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeeklyExpense" DROP COLUMN "category",
ADD COLUMN     "specialCategoryId" TEXT;

-- CreateTable
CREATE TABLE "SpecialBudgetCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialBudgetId" TEXT NOT NULL,

    CONSTRAINT "SpecialBudgetCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SpecialBudgetCategory_specialBudgetId_idx" ON "SpecialBudgetCategory"("specialBudgetId");

-- CreateIndex
CREATE INDEX "WeeklyExpense_specialCategoryId_idx" ON "WeeklyExpense"("specialCategoryId");

-- AddForeignKey
ALTER TABLE "WeeklyExpense" ADD CONSTRAINT "WeeklyExpense_specialCategoryId_fkey" FOREIGN KEY ("specialCategoryId") REFERENCES "SpecialBudgetCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialBudgetCategory" ADD CONSTRAINT "SpecialBudgetCategory_specialBudgetId_fkey" FOREIGN KEY ("specialBudgetId") REFERENCES "SpecialBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
