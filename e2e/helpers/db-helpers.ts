import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
export type PrismaModelSheets = keyof typeof prisma;

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
  await prisma.user.deleteMany({
    where: { email },
  });
};

export const updateSessionExpirationInDb = async (
  userId: string,
  expiresAt: Date,
) => {
  await prisma.session.updateMany({
    where: { userId },
    data: { expiresAt },
  });
};

export const getSession = async (userId: string) => {
  return prisma.session.findFirst({
    where: { userId },
    select: { id: true, expiresAt: true },
  });
};

export const createMonthlyBudgetInDB = async (
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
        create: [{ name: "income", amount: 550 }],
      },
      charges: {
        create: [{ name: "charge", amount: 50 }],
      },
    },
    include: {
      charges: {
        select: { name: true, amount: true },
      },
      incomes: {
        select: { name: true, amount: true },
      },
    },
  });

  return {
    ...budget,
    remainingBudget: Number(budget.remainingBudget),
    weeklyBudget: Number(budget.weeklyBudget),
  };
};

export const createArchivedBudgets = async (
  userId: string,
  year = 2025,
  count = 7,
) => {
  const budgetsData = [];
  const targetMonths = [];

  for (let i = 0; i < count; i++) {
    const month = i + 1;
    targetMonths.push(month);

    budgetsData.push({
      userId,
      month,
      year,
      isCurrent: false,
      remainingBudget: 0,
      weeklyBudget: 0,
      numberOfWeeks: 4,
    });
  }

  await prisma.monthlyBudget.createMany({
    data: budgetsData,
  });

  return {
    year,
    months: targetMonths.sort((a, b) => b - a),
  };
};

export const createMonthlyExpenseInDB = async (
  monthlyBudgetId: string,
  weekNumber = 1,
) => {
  const newExpense = await prisma.expense.create({
    data: {
      monthlyBudgetId,
      name: "Expense",
      amount: 50,
      weekNumber,
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

export const createFixedEntryInDb = async (
  userId: string,
  table: PrismaModelSheets,
) => {
  const dbModel = prisma[table] as any;
  const entry = await dbModel.create({
    data: {
      userId,
      name: "Entry",
      amount: "100",
    },
  });
  return { ...entry, amount: Number(entry.amount) };
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

export const createSpecialBudgetInDB = async (
  userId: string,
  name = "Special project",
) => {
  const newBudget = await prisma.specialBudget.create({
    data: {
      userId,
      name,
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

export const createSpecialBudgetWithCatAndExpenses = async (userId: string) => {
  const newBudget = await prisma.specialBudget.create({
    data: {
      userId,
      name: "Special project",
      totalBudget: 200,
      remainingBudget: 100,
    },
  });

  const category = await createSpecialCategoryInDB(newBudget.id);
  const expenseWithCat = await createSpecialExpenseInDB(
    newBudget.id,
    category.id,
  );
  const expenseWithoutCat = await createSpecialExpenseInDB(newBudget.id);

  return {
    ...newBudget,
    totalBudget: Number(newBudget.totalBudget),
    remainingBudget: Number(newBudget.remainingBudget),
    category: {
      name: category.name,
      expense: expenseWithCat,
    },
    expenseWithoutCat,
  };
};

export const createMultipleSpecialBudgets = async (
  userId: string,
  count = 2,
) => {
  const budgetsData = [];

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    budgetsData.push({
      userId,
      name: `Project ${i}`,
      totalBudget: 0,
      remainingBudget: 0,
      createdAt: date,
    });
  }

  const budgets = await prisma.specialBudget.createMany({
    data: budgetsData,
  });

  return budgetsData;
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
      name: "Special category",
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
