/*
  Warnings:

  - Added the required column `weeklyBudget` to the `MonthlyBudget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonthlyBudget" ADD COLUMN     "weeklyBudget" DECIMAL(10,2) NOT NULL;
