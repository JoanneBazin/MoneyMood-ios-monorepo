import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

export const createUserInDB = async (
  name: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });
};

export const deleteUserFromDB = async (email: string) => {
  await prisma.user.delete({
    where: { email },
  });
};

export const createMonthlyBudgetInBD = async (
  userId: string,
  month = 1,
  year = 2025,
  isCurrent = true,
) => {
  const budget = await prisma.monthlyBudget.create({
    data: {
      userId,
      month,
      year,
      isCurrent,
      remainingBudget: 500,
      weeklyBudget: 100,
      numberOfWeeks: 5,
      incomes: {
        create: [{ name: "income", amount: 500 }],
      },
    },
  });

  return {
    ...budget,
    remainingBudget: Number(budget.remainingBudget),
    weeklyBudget: Number(budget.weeklyBudget),
  };
};

export const createMonthlyExpenseInDB = async (monthlyBudgetId: string) => {
  const newExpense = await prisma.expense.create({
    data: {
      monthlyBudgetId,
      name: "Expense",
      amount: 50,
      weekNumber: 1,
    },
    select: {
      name: true,
      amount: true,
    },
  });
  return {
    ...newExpense,
    amount: Number(newExpense.amount),
  };
};

export const deleteAllMonthlyBudgetsInDB = async (userId: string) => {
  await prisma.monthlyBudget.deleteMany({
    where: { userId },
  });
};

export const deleteAllMonthlyExpensesInDB = async (monthlyBudgetId: string) => {
  await prisma.expense.deleteMany({
    where: { monthlyBudgetId },
  });
};

export const deleteAllFixedEntriesInDB = async (userId: string) => {
  await prisma.$transaction([
    prisma.fixedIncome.deleteMany({
      where: { userId },
    }),
    prisma.fixedCharge.deleteMany({
      where: { userId },
    }),
  ]);
};

export const resetUserData = async (
  id: string,
  name: string,
  email: string,
) => {
  await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });
};

export const createSpecialBudgetInDB = async (userId: string) => {
  const newBudget = await prisma.specialBudget.create({
    data: {
      userId,
      name: "Common project",
      totalBudget: 100,
      remainingBudget: 100,
    },
  });
  return {
    ...newBudget,
    totalBudget: Number(newBudget.totalBudget),
    remainingBudget: Number(newBudget.remainingBudget),
  };
};

export const createSpecialExpenseInDB = async (
  specialBudgetId: string,
  catId?: string,
) => {
  const newExpense = await prisma.expense.create({
    data: {
      specialBudgetId,
      name: "Expense",
      amount: 50,
      specialCategoryId: catId,
    },
    select: {
      name: true,
      amount: true,
    },
  });
  return {
    ...newExpense,
    amount: Number(newExpense.amount),
  };
};

export const deleteAllSpecialBudgetsInDB = async (userId: string) => {
  await prisma.specialBudget.deleteMany({
    where: { userId },
  });
};

export const createSpecialCategoryInDB = async (specialBudgetId: string) => {
  return prisma.specialBudgetCategory.create({
    data: {
      specialBudgetId,
      name: "Common category",
    },
    select: { name: true, id: true },
  });
};

export const cleanSpecialBudgetDataInDb = async (specialBudgetId: string) => {
  await prisma.$transaction([
    prisma.specialBudgetCategory.deleteMany({
      where: {
        specialBudgetId,
      },
    }),
    prisma.expense.deleteMany({
      where: { specialBudgetId },
    }),
  ]);
};
