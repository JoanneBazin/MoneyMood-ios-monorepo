import { prisma } from "../setup";

const baseBudget = {
  month: 9,
  year: 2025,
  isCurrent: true,
  incomes: [{ name: "Income", amount: 100 }],
  charges: [
    { name: "Charges 1", amount: 10 },
    { name: "Charges 2", amount: 10 },
  ],
  numberOfWeeks: 4,
  remainingBudget: 80,
  weeklyBudget: 20,
};

export const createMonthlyBudget = async (
  userId: string,
  newBudget = baseBudget
) => {
  const {
    month,
    year,
    isCurrent,
    remainingBudget,
    weeklyBudget,
    incomes,
    charges,
    numberOfWeeks,
  } = newBudget;
  const budget = await prisma.monthlyBudget.create({
    data: {
      userId,
      month,
      year,
      isCurrent,
      remainingBudget,
      weeklyBudget,
      numberOfWeeks,
      incomes: {
        create: incomes,
      },
      charges: {
        create: charges,
      },
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
