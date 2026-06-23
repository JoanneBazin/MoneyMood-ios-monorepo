import { NextFunction, Request, Response } from "express";
import {
  hashPassword,
  HttpError,
  isPrismaForeignKeyConstraint,
  normalizeDecimalFields,
  prisma,
} from "src/lib";
import { updateMonthlyBudgetRemaining } from "src/services";

export const seedUserB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hashedPassword = await hashPassword("Pass12345");
    const newUserB = await prisma.user.create({
      data: {
        email: "user_b_staging@test.com",
        name: "User B",
        password: hashedPassword,
        monthlyBudgets: {
          create: [
            {
              month: 1,
              year: 2026,
              isCurrent: true,
              remainingBudget: 0,
              weeklyBudget: 0,
              numberOfWeeks: 4,
              incomes: {
                create: [{ name: "Income B", amount: 20 }],
              },
              charges: {
                create: [{ name: "Charge B", amount: 10 }],
              },
              expenses: {
                create: [{ name: "Expense B", amount: 10, weekNumber: 1 }],
              },
            },
            {
              month: 1,
              year: 2025,
              isCurrent: false,
              remainingBudget: 0,
              weeklyBudget: 0,
              numberOfWeeks: 4,
            },
          ],
        },
        specialBudgets: {
          create: {
            name: "Project B",
            totalBudget: 110,
            remainingBudget: 100,
            categories: {
              create: {
                name: "Category B",
              },
            },
            expenses: {
              create: {
                name: "Project expense B",
                amount: 10,
              },
            },
          },
        },
      },
      select: {
        specialBudgets: {
          select: {
            id: true,
            categories: {
              select: { id: true },
            },
            expenses: {
              select: { id: true },
            },
          },
        },
        monthlyBudgets: {
          select: {
            id: true,
            isCurrent: true,
            charges: {
              select: { id: true },
            },
            incomes: {
              select: { id: true },
            },
            expenses: {
              select: { id: true },
            },
          },
        },
      },
    });

    const currentBudget = newUserB.monthlyBudgets.filter((b) => b.isCurrent)[0];
    const project = newUserB.specialBudgets[0];

    return res.status(201).json({
      message: "Staging User B seeded !",
      userData: {
        monthlyBudgetId: currentBudget.id,
        monthlyChargeId: currentBudget.charges[0].id,
        monthlyIncomeId: currentBudget.incomes[0].id,
        monthlyExpenseId: currentBudget.expenses[0].id,
        historyBudgetId: newUserB.monthlyBudgets.filter((b) => !b.isCurrent)[0]
          .id,
        projectId: project.id,
        projectCategory: project.categories[0].id,
        projectExpense: project.expenses[0].id,
      },
    });
  } catch (err) {
    console.error(err);
    return next(new HttpError(500, "Failed to seed User"));
  }
};

export const cleanStagingDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await prisma.user.deleteMany({});

    return res
      .status(200)
      .json({ message: "Staging database entirely cleaned up!" });
  } catch (error) {
    console.error(error);
    return next(new HttpError(500, "Failed to clean database"));
  }
};

export const seedTestBudgetData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  interface reqType {
    model: keyof typeof prisma;
    data: {
      monthlyBudgetId: string;
      name: string;
      amount: number;
      weeklyNumber?: number;
    };
  }

  const reqBody: reqType = req.body;
  const { data, model } = reqBody;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbModel = prisma[model] as any;

    const createdItem = await dbModel.create({
      data,
      select: {
        name: true,
        amount: true,
      },
    });
    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      data.monthlyBudgetId,
    );

    return res.status(201).json({
      data: normalizeDecimalFields(createdItem),
      remainingBudget: normalizeDecimalFields(remainingBudget),
    });
  } catch (error) {
    if (isPrismaForeignKeyConstraint(error)) {
      return next(new HttpError(404, "Référence à un budget inexistant"));
    }
    return next(error);
  }
};
