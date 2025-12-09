import app from "../../app";
import { prisma } from "../../lib/prismaClient";
import { authenticatedRequest, createTestUser } from "../helpers/auth-helpers";
import { addFixedIncome } from "../helpers/db-helpers";
import request from "supertest";

describe("Fixed Entries Routes", () => {
  let authCookie: string;
  let userId: string;
  const entry = {
    name: "Fixed entry",
    amount: 20,
  };

  beforeAll(async () => {
    const { response, cookie } = await createTestUser("fixed-entries@test.com");
    authCookie = cookie;
    userId = response.body.id;

    expect(cookie).toBeTruthy();
  });

  beforeEach(async () => {
    await prisma.fixedCharge.deleteMany();
    await prisma.fixedIncome.deleteMany();
  });

  it("should add new fixed charge", async () => {
    const authReq = authenticatedRequest(authCookie);
    const res = await authReq.post(`/api/fixed-charges/`).send(entry);

    expect(res.status).toBe(201);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: entry.name,
        amount: entry.amount,
      },
    ]);

    const chargeInDb = await prisma.fixedCharge.findFirst({
      where: { name: entry.name },
      select: { id: true },
    });
    expect(chargeInDb).toBeDefined();
  });

  it("should add multiple fixed incomes", async () => {
    const reqBody = [entry, entry];
    const authReq = authenticatedRequest(authCookie);
    const res = await authReq.post(`/api/fixed-incomes/`).send(reqBody);

    expect(res.status).toBe(201);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: entry.name,
        amount: entry.amount,
      },
      {
        id: expect.any(String),
        name: entry.name,
        amount: entry.amount,
      },
    ]);

    const chargeInDb = await prisma.fixedIncome.findMany({
      where: { name: entry.name },
      select: { id: true },
    });

    expect(chargeInDb).toHaveLength(2);
  });

  it("should return 401 if adding fixed charge without auth", async () => {
    const res = await request(app).post(`/api/fixed-charges/`).send(entry);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 400 if adding fixed charge with invalid body", async () => {
    const wrongCharge = { ...entry, name: null };

    const authReq = authenticatedRequest(authCookie);
    const res = await authReq.post(`/api/fixed-charges/`).send(wrongCharge);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should update fixed income", async () => {
    const { id: incomeId } = await addFixedIncome(userId);
    const updatedIncome = { name: "Updated", amount: 20 };

    const authReq = authenticatedRequest(authCookie);
    const res = await authReq
      .put(`/api/fixed-incomes/${incomeId}`)
      .send(updatedIncome);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: incomeId,
      name: updatedIncome.name,
      amount: updatedIncome.amount,
    });

    const incomeInDb = await prisma.fixedIncome.findUnique({
      where: { id: incomeId },
      select: { name: true, amount: true },
    });
    expect(incomeInDb?.name).toBe(updatedIncome.name);
    expect(Number(incomeInDb?.amount)).toBe(updatedIncome.amount);
  });

  it("should delete fixed income", async () => {
    const { id: incomeId } = await addFixedIncome(userId);
    const authReq = authenticatedRequest(authCookie);
    const res = await authReq.delete(`/api/fixed-incomes/${incomeId}`).send();

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");

    const incomeInDb = await prisma.fixedIncome.findUnique({
      where: { id: incomeId },
    });
    expect(incomeInDb).toBeNull();
  });
});
