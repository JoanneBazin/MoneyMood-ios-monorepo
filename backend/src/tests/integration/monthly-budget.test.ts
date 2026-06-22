/// <reference types="jest" />

import app from "../../app";
import { prisma } from "../../lib/prismaClient";
import { authenticatedRequest, createTestUser } from "../helpers/auth-helpers";
import {
  addMonthlyExpense,
  addMonthlyIncome,
  createMonthlyBudget,
} from "../helpers/db-helpers";
import request from "supertest";

describe("Monthly Budget Routes", () => {
  let authCookie: string;
  let userId: string;

  beforeAll(async () => {
    const { response, cookie } = await createTestUser(
      "monthly-budget@test.com",
    );
    authCookie = cookie;
    userId = response.body.id;

    expect(cookie).toBeTruthy();
  });

  beforeEach(async () => {
    await prisma.monthlyBudget.deleteMany();
  });

  describe("__Monthly budget__", () => {
    const newBudget = {
      month: 9,
      year: 2025,
      isCurrent: true,
      incomes: [{ name: "Income", amount: 100 }],
      charges: [
        { name: "Charges 1", amount: 10 },
        { name: "Charges 2", amount: 10 },
      ],
      numberOfWeeks: 4,
    };

    it("should create monthly budget", async () => {
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq.post("/api/monthly-budgets").send(newBudget);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toMatchObject({
        id: expect.any(String),
        month: 9,
        year: 2025,
        isCurrent: true,
        remainingBudget: 80,
        weeklyBudget: 20,
        numberOfWeeks: 4,
        incomes: expect.arrayContaining([]),
        charges: expect.arrayContaining([]),
        expenses: expect.arrayContaining([]),
      });

      const budgetInDb = await prisma.monthlyBudget.findUnique({
        where: { id: res.body.id, userId },
        select: {
          month: true,
          isCurrent: true,
        },
      });
      expect(budgetInDb).toBeDefined();
      expect(budgetInDb?.month).toBe(newBudget.month);
      expect(budgetInDb?.isCurrent).toBeTruthy();
    });

    it("should return 401 if creating budget without auth", async () => {
      const res = await request(app)
        .post("/api/monthly-budgets")
        .send(newBudget);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 401 if deleting budget without auth", async () => {
      const budget = await createMonthlyBudget(userId);
      const res = await request(app).delete(
        `/api/monthly-budgets/${budget.id}`,
      );

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
    });

    const fields: Array<keyof typeof newBudget> = [
      "month",
      "year",
      "isCurrent",
      "numberOfWeeks",
    ];
    for (const field of fields) {
      it(`should return 400 if creating budget with missing ${field}`, async () => {
        const authReq = authenticatedRequest(authCookie);
        const reqBody = { ...newBudget };
        delete reqBody[field];

        const res = await authReq.post("/api/monthly-budgets").send(reqBody);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error");
      });
    }

    it("should return current budget", async () => {
      await createMonthlyBudget(userId);
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq.get("/api/monthly-budgets/current");

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: expect.any(String),
        month: expect.any(Number),
        year: expect.any(Number),
        isCurrent: true,
        remainingBudget: expect.any(Number),
        weeklyBudget: expect.any(Number),
        numberOfWeeks: expect.any(Number),
        incomes: expect.any(Array),
        charges: expect.any(Array),
        expenses: expect.any(Array),
      });
    });
  });

  describe("__Monthly expenses__", () => {
    const newExpense = {
      name: "Expense",
      amount: 20,
      weekNumber: 1,
    };
    it("should create new monthly expenses and update remaining budget", async () => {
      const budget = await createMonthlyBudget(userId);

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/monthly-budgets/${budget.id}/expenses`)
        .send(newExpense);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("remainingBudget");
      expect(res.body.remainingBudget).toBe(
        budget.remainingBudget - newExpense.amount,
      );

      const expenseInDb = await prisma.expense.findFirst({
        where: { name: newExpense.name, monthlyBudgetId: budget.id },
        select: { id: true },
      });
      expect(expenseInDb).toBeDefined();
    });

    it("should return 401 if adding expense without auth", async () => {
      const budget = await createMonthlyBudget(userId);
      const res = await request(app)
        .post(`/api/monthly-budgets/${budget.id}/expenses`)
        .send(newExpense);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if adding expense with invalid body", async () => {
      const budget = await createMonthlyBudget(userId);
      const wrongExpense = { ...newExpense, weekNumber: 0 };

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/monthly-budgets/${budget.id}/expenses`)
        .send(wrongExpense);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if adding expense without weekNumber", async () => {
      const budget = await createMonthlyBudget(userId);
      const reqBody = { name: newExpense.name, amount: newExpense.amount };

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/monthly-budgets/${budget.id}/expenses`)
        .send(reqBody);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 403 if adding expense with invalid budgetId", async () => {
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/monthly-budgets/123/expenses`)
        .send(newExpense);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("error");
    });

    it("should update monthly expense", async () => {
      const budget = await createMonthlyBudget(userId);
      const { id: expenseId } = await addMonthlyExpense(budget.id);
      const updatedExpense = { name: "Updated", amount: 5 };

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .put(`/api/monthly-budgets/${budget.id}/expenses/${expenseId}`)
        .send(updatedExpense);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("remainingBudget");
      expect(res.body.remainingBudget).not.toBe(budget.remainingBudget);

      const expenseInDb = await prisma.expense.findUnique({
        where: { id: expenseId, monthlyBudgetId: budget.id },
        select: { name: true, amount: true },
      });
      expect(expenseInDb?.name).toBe(updatedExpense.name);
      expect(Number(expenseInDb?.amount)).toBe(updatedExpense.amount);
    });

    it("should delete monthly expense", async () => {
      const budget = await createMonthlyBudget(userId);
      const { id: expenseId } = await addMonthlyExpense(budget.id);

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .delete(`/api/monthly-budgets/${budget.id}/expenses/${expenseId}`)
        .send();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("remainingBudget");
      expect(res.body.remainingBudget).toBe(budget.remainingBudget);

      const expenseInDb = await prisma.expense.findUnique({
        where: { id: expenseId, monthlyBudgetId: budget.id },
      });
      expect(expenseInDb).toBeNull();
    });
  });

  type PrismaModelSheets = keyof typeof prisma;
  interface ResourceConfig {
    label: string;
    entryType: "charges" | "incomes";
    table: PrismaModelSheets;
    computeExpected: (prev: number, amount: number) => number;
  }

  const resources: ResourceConfig[] = [
    {
      label: "Monthly charges",
      entryType: "charges",
      table: "monthlyCharge",
      computeExpected: (prev, amount) => prev - amount,
    },
    {
      label: "Monthly incomes",
      entryType: "incomes",
      table: "monthlyIncome",
      computeExpected: (prev: number, amount: number) => prev + amount,
    },
  ];

  for (const { label, entryType, table, computeExpected } of resources) {
    describe(`__${label}__`, () => {
      const newEntry = {
        name: "New Entry",
        amount: 100,
      };

      it(`should create new monthly ${entryType} and update remaining budget`, async () => {
        const budget = await createMonthlyBudget(userId);

        const authReq = authenticatedRequest(authCookie);
        const res = await authReq
          .post(`/api/monthly-budgets/${budget.id}/${entryType}`)
          .send(newEntry);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("remainingBudget");
        expect(res.body.remainingBudget).toBe(
          computeExpected(budget.remainingBudget, newEntry.amount),
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dbModel = prisma[table] as any;
        const entryInDb = await dbModel.findFirst({
          where: { name: newEntry.name, monthlyBudgetId: budget.id },
          select: { id: true },
        });
        expect(entryInDb).not.toBeNull();
      });

      it("should update monthly income", async () => {
        const budget = await createMonthlyBudget(userId);
        const { id: incomeId } = await addMonthlyIncome(budget.id);
        const updatedIncome = { name: "Updated", amount: 20 };

        const authReq = authenticatedRequest(authCookie);
        const res = await authReq
          .put(`/api/monthly-budgets/${budget.id}/incomes/${incomeId}`)
          .send(updatedIncome);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("remainingBudget");
        expect(res.body.remainingBudget).toBe(
          budget.remainingBudget + updatedIncome.amount,
        );

        const incomeInDb = await prisma.monthlyIncome.findUnique({
          where: { id: incomeId, monthlyBudgetId: budget.id },
          select: { name: true, amount: true },
        });
        expect(incomeInDb?.name).toBe(updatedIncome.name);
        expect(Number(incomeInDb?.amount)).toBe(updatedIncome.amount);
      });

      it("should delete monthly income", async () => {
        const budget = await createMonthlyBudget(userId);
        const { id: incomeId } = await addMonthlyIncome(budget.id);

        const authReq = authenticatedRequest(authCookie);
        const res = await authReq
          .delete(`/api/monthly-budgets/${budget.id}/incomes/${incomeId}`)
          .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("remainingBudget");
        expect(res.body.remainingBudget).toBe(budget.remainingBudget);

        const incomeInDb = await prisma.monthlyIncome.findUnique({
          where: { id: incomeId, monthlyBudgetId: budget.id },
        });
        expect(incomeInDb).toBeNull();
      });
    });
  }
});
