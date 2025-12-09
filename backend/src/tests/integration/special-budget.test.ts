import app from "../../app";
import { prisma } from "../../lib/prismaClient";
import { authenticatedRequest, createTestUser } from "../helpers/auth-helpers";
import {
  createSpecialBudget,
  createSpecialCategory,
} from "../helpers/db-helpers";
import request from "supertest";

describe("Special Budget Routes", () => {
  let authCookie: string;
  let userId: string;

  beforeAll(async () => {
    const { response, cookie } = await createTestUser(
      "special-budget@test.com"
    );
    authCookie = cookie;
    userId = response.body.id;

    expect(cookie).toBeTruthy();
  });

  beforeEach(async () => {
    await prisma.specialBudget.deleteMany();
  });

  describe("__Special budget__", () => {
    const newBudget = {
      name: "New special budget",
      totalBudget: 200,
    };

    it("should create special budget", async () => {
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq.post("/api/special-budgets").send(newBudget);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        id: expect.any(String),
        name: newBudget.name,
        totalBudget: newBudget.totalBudget,
        remainingBudget: newBudget.totalBudget,
      });

      const budgetInDb = await prisma.specialBudget.findUnique({
        where: { id: res.body.id, userId },
        select: {
          name: true,
        },
      });
      expect(budgetInDb).toBeDefined();
      expect(budgetInDb?.name).toBe(newBudget.name);
    });

    it("should return 401 if creating budget without auth", async () => {
      const res = await request(app)
        .post("/api/special-budgets")
        .send(newBudget);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if creating budget with invalid body", async () => {
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post("/api/monthly-budgets")
        .send({ ...newBudget, name: null });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should update special budget", async () => {
      const specialBudget = await createSpecialBudget(userId);

      const updatedBudget = { name: "Project", totalBudget: 400 };

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .put(`/api/special-budgets/${specialBudget.id}`)
        .send(updatedBudget);

      expect(res.status).toBe(200);
      expect(res.body.remainingBudget).toBe(updatedBudget.totalBudget);

      const budgetInDb = await prisma.specialBudget.findUnique({
        where: { id: specialBudget.id, userId },
        select: { name: true, totalBudget: true },
      });
      expect(budgetInDb?.name).toBe(updatedBudget.name);
      expect(Number(budgetInDb?.totalBudget)).toBe(updatedBudget.totalBudget);
    });

    it("should delete special budget", async () => {
      const specialBudget = await createSpecialBudget(userId);

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .delete(`/api/special-budgets/${specialBudget.id}`)
        .send();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");

      const budgetInDb = await prisma.specialBudget.findUnique({
        where: { id: specialBudget.id, userId },
      });
      expect(budgetInDb).toBeNull();
    });
  });

  describe("__Budget categories__", () => {
    const newCat = {
      name: "Expenses",
    };
    it("should create new category in budget", async () => {
      const budget = await createSpecialBudget(userId);

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/special-budgets/${budget.id}/categories`)
        .send(newCat);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        id: expect.any(String),
        name: newCat.name,
        specialBudgetId: budget.id,
      });

      const catInDb = await prisma.specialBudgetCategory.findFirst({
        where: { name: newCat.name, specialBudgetId: budget.id },
        select: { id: true },
      });
      expect(catInDb).toBeDefined();
    });

    it("should return 404 if adding category with invalid budgetId", async () => {
      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/special-budgets/123/categories`)
        .send(newCat);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("__Budget expenses__", () => {
    const newEntry = {
      name: "New expense",
      amount: 20,
    };

    it("should create new expense and update remaining budget", async () => {
      const budget = await createSpecialBudget(userId);

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/special-budgets/${budget.id}/expenses`)
        .send(newEntry);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("remainingBudget");
      expect(res.body.remainingBudget).toBe(
        budget.remainingBudget - newEntry.amount
      );

      const expenseInDb = await prisma.expense.findFirst({
        where: { name: newEntry.name, specialBudgetId: budget.id },
        select: { id: true },
      });
      expect(expenseInDb).toBeDefined();
    });

    it("should create new expense with category and update remaining budget", async () => {
      const budget = await createSpecialBudget(userId);
      const { id: catId } = await createSpecialCategory(budget.id);
      const entryWithCat = { ...newEntry, specialCategoryId: catId };

      const authReq = authenticatedRequest(authCookie);
      const res = await authReq
        .post(`/api/special-budgets/${budget.id}/expenses`)
        .send(entryWithCat);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("remainingBudget");
      expect(res.body.remainingBudget).toBe(
        budget.remainingBudget - entryWithCat.amount
      );

      const expenseInDb = await prisma.expense.findFirst({
        where: { name: entryWithCat.name, specialBudgetId: budget.id },
        select: { id: true, specialCategoryId: true },
      });
      expect(expenseInDb).toBeDefined();
      expect(expenseInDb?.specialCategoryId).toBe(catId);
    });
  });
});
