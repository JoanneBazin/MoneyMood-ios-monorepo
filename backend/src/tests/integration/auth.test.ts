import app from "../../app";
import { prisma } from "../../lib/prismaClient";
import bcrypt from "bcrypt";
import request from "supertest";

describe("Auth API", () => {
  const testUser = {
    email: "test@example.com",
    password: "Pass1234",
    name: "Test User",
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: { email: testUser.email },
    });

    await prisma.user.create({
      data: {
        email: testUser.email,
        password: await bcrypt.hash(testUser.password, 10),
        name: testUser.name,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: testUser.email },
    });
    await prisma.$disconnect();
  });

  test("POST /api/auth/login should return 200 and user infos", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email", testUser.email);
    expect(res.body).toHaveProperty("name", testUser.name);
    expect(res.body).not.toHaveProperty("password");

    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.headers["set-cookie"][0]).toMatch(/session=/);
  });

  test("POST /api/auth/login with wrong password should return 401", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongPassword",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");

    expect(res.headers["set-cookie"]).toBeUndefined();
  });

  test("POST /api/auth/login with wrong non-existent user should return 401", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nonexistent@example.com",
      password: "anyPassword",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
