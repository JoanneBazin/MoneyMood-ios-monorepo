import app from "../../app";
import { prisma } from "../../lib/prismaClient";
import request from "supertest";
import { authenticatedRequest, createTestUser } from "../helpers/auth.helpers";

describe("Budget API", () => {
  let authCookie: string;
  let testUserId: string;
  let budgetId: string;

  beforeAll(async () => {
    const { response, cookie } = await createTestUser();
    authCookie = cookie;
    testUserId = response.body.id;

    expect(cookie).toBeTruthy();
  });

  afterAll(async () => {
    if (testUserId) {
      await prisma.user.delete({
        where: { id: testUserId },
      });
    }

    await prisma.$disconnect();
  });

  describe("Monthly Budget", () => {
    test("POST /api/monthly-budgets should create monthly budget", async () => {
      const newBudget = {
        month: 9,
        year: 2025,
        isCurrent: true,
        incomes: [{ name: "Income", amount: "100" }],
        charges: [
          { name: "Charges 1", amount: "20" },
          { name: "Charges 2", amount: "20" },
        ],
        numberOfWeeks: 4,
      };

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq.post("/api/monthly-budgets").send(newBudget);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toMatchObject({
        id: expect.any(String),
        month: 9,
        year: 2025,
        isCurrent: true,
        remainingBudget: 60,
        weeklyBudget: expect.any(Number),
        numberOfWeeks: 4,
        incomes: expect.arrayContaining([]),
        charges: expect.arrayContaining([]),
        expenses: expect.arrayContaining([]),
      });

      budgetId = res.body.id;
    });

    test("POST /api/monthly-budgets should fail without auth", async () => {
      const res = await request(app).post("/api/monthly-budgets").send({
        month: 9,
        year: 2025,
        isCurrent: true,
        incomes: [],
        charges: [],
        numberOfWeeks: 4,
      });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
    });

    test("POST /api/monthly-budgets should fail with invalid body", async () => {
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq.post("/api/monthly-budgets").send({
        month: 9,
        year: 2025,
        isCurrent: true,
        incomes: "wrongData",
        charges: [],
        numberOfWeeks: 4,
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    test("GET /api/monthly-budgets/current should return current budget", async () => {
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq.get("/api/monthly-budgets/current");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");
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

  describe("Monthly Expenses", () => {
    beforeAll(() => {
      if (!budgetId) throw new Error("Budget ID is not set.");
    });

    test("POST /api/monthly-budgets/:id/expenses should create new monthly expenses and update remaining budget", async () => {
      const newExpenses = [
        {
          name: "Expense",
          amount: 20,
          weekNumber: 1,
        },
      ];

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/monthly-budgets/${budgetId}/expenses`)
        .send(newExpenses);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("expenses");
      expect(res.body).toHaveProperty("remainingBudget");
      expect(res.body.remainingBudget).toBe(40);
    });

    test("POST /api/monthly-budgets/:id/expenses should fail with invalid body", async () => {
      const newExpenses = [
        {
          name: "Expenses",
          amount: 50,
          weekNumber: "wrongData",
        },
      ];
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/monthly-budgets/${budgetId}/expenses`)
        .send(newExpenses);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    test("POST /api/monthly-budgets/:id/expenses should fail with invalid budgetId", async () => {
      const newExpenses = [
        {
          name: "Expenses",
          amount: 50,
          weekNumber: 1,
        },
      ];
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/monthly-budgets/123/expenses`)
        .send(newExpenses);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("error");
    });
  });
});
