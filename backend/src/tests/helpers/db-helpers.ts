import { prisma } from "../setup";
import bcrypt from "bcrypt";

export const createUserInDb = async (
  email: string,
  name = "Test User",
  password = "Password1234",
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userInDb = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, email: true },
  });
  return { ...userInDb, password };
};

export const deleteUserFromDb = async (email: string) => {
  await prisma.user.deleteMany({
    where: { email },
  });
};

export const createMonthlyBudget = async (userId: string, isCurrent = true) => {
  const budget = await prisma.monthlyBudget.create({
    data: {
      userId,
      month: 1,
      year: 2025,
      isCurrent,
      remainingBudget: 0,
      weeklyBudget: 0,
      numberOfWeeks: 4,
    },
  });

  return {
    ...budget,
    remainingBudget: Number(budget.remainingBudget),
    weeklyBudget: Number(budget.weeklyBudget),
  };
};

export const createSpecialBudget = async (userId: string) => {
  const specialBudget = await prisma.specialBudget.create({
    data: {
      userId,
      name: "New project",
      totalBudget: 200,
      remainingBudget: 200,
    },
  });
  return {
    ...specialBudget,
    totalBudget: Number(specialBudget.totalBudget),
    remainingBudget: Number(specialBudget.remainingBudget),
  };
};

export const addMonthlyExpense = async (monthlyBudgetId: string) => {
  return prisma.expense.create({
    data: {
      monthlyBudgetId,
      name: "New expense",
      amount: 10,
      weekNumber: 1,
    },
    select: { id: true },
  });
};

export const addFixedIncome = async (userId: string) => {
  const income = await prisma.fixedIncome.create({
    data: {
      userId,
      name: "Income",
      amount: 10,
    },
    select: { id: true },
  });
  return income;
};

export const addMonthlyIncome = async (monthlyBudgetId: string) => {
  return prisma.monthlyIncome.create({
    data: {
      monthlyBudgetId,
      name: "Income",
      amount: 10,
    },
    select: { id: true },
  });
};
export const createSpecialCategory = async (specialBudgetId: string) => {
  return prisma.specialBudgetCategory.create({
    data: {
      specialBudgetId,
      name: "New category",
    },
    select: { id: true },
  });
};
