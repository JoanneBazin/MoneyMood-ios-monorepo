import { authenticatedRequest, createTestUser } from "../helpers/auth-helpers";
import { createMonthlyBudget, deleteUserFromDb } from "../helpers/db-helpers";

describe("Budget History Routes", () => {
  let authCookie: string;
  let user: { id: string; email: string };
  let budget: Awaited<ReturnType<typeof createMonthlyBudget>>;

  beforeAll(async () => {
    const { userData, cookie } = await createTestUser("history@test.com");
    authCookie = cookie;
    user = userData;

    expect(cookie).toBeTruthy();
    budget = await createMonthlyBudget(user.id, false);
  });

  afterAll(async () => {
    await deleteUserFromDb(user.email);
  });

  it("should return budget by date", async () => {
    const authReq = authenticatedRequest(authCookie);
    const res = await authReq.get(
      `/api/monthly-budgets?month=${budget.month}&year=${budget.year}`,
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toMatchObject({
      id: budget.id,
      month: budget.month,
      year: budget.year,
      remainingBudget: budget.remainingBudget,
    });
  });

  it("should return 404 if budget by date not found", async () => {
    const authReq = authenticatedRequest(authCookie);
    const res = await authReq.get(`/api/monthly-budgets?month=11&year=2026`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return budget by id", async () => {
    const authReq = authenticatedRequest(authCookie);
    const res = await authReq.get(`/api/monthly-budgets/${budget.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      month: expect.any(Number),
      year: expect.any(Number),
      isCurrent: expect.any(Boolean),
      remainingBudget: expect.any(Number),
      weeklyBudget: expect.any(Number),
      numberOfWeeks: expect.any(Number),
      incomes: expect.any(Array),
      charges: expect.any(Array),
      expenses: expect.any(Array),
    });
  });

  it("should return 404 if budget by id not found", async () => {
    const authReq = authenticatedRequest(authCookie);
    const res = await authReq.get(`/api/monthly-budgets/123`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
