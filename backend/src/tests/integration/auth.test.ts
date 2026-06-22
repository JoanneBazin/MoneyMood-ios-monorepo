import app from "../../app";
import request from "supertest";
import { prisma } from "../setup";
import { createUserInDb, deleteUserFromDb } from "../helpers/db-helpers";
import { authenticatedRequest, createTestUser } from "../helpers/auth-helpers";

describe("Auth Routes", () => {
  const user = {
    email: "auth@test.com",
    password: "Pass1234",
    name: "Test User",
  };

  beforeEach(async () => {
    await deleteUserFromDb(user.email);
  });

  afterAll(async () => {
    await deleteUserFromDb(user.email);
  });

  it("should signup and return user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("email", user.email);
    expect(res.body).toHaveProperty("name", user.name);
    expect(res.body).not.toHaveProperty("password");

    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.headers["set-cookie"][0]).toMatch(/session=/);

    const userInDb = await prisma.user.findUnique({
      where: { id: res.body.id },
      select: { email: true },
    });
    expect(userInDb).toBeDefined();
    expect(userInDb?.email).toBe(user.email);
  });

  it("should login and return user", async () => {
    await createUserInDb(user.name, user.email, user.password);

    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email", user.email);
    expect(res.body).toHaveProperty("name", user.name);
    expect(res.body).not.toHaveProperty("password");

    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.headers["set-cookie"][0]).toMatch(/session=/);

    const userInDb = await prisma.user.findUnique({
      where: { id: res.body.id },
      select: { email: true },
    });
    expect(userInDb).toBeDefined();
    expect(userInDb?.email).toBe(user.email);
  });

  it("should return 401 if password is wrong", async () => {
    await createUserInDb(user.name, user.email, user.password);

    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "wrongPassword1234",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");

    expect(res.headers["set-cookie"]).toBeUndefined();
  });

  it("should return 401 if user doesn't exist", async () => {
    const wrongUser = {
      email: "nonexistent@test.com",
      password: "anyPassword1234",
    };
    const res = await request(app).post("/api/auth/login").send(wrongUser);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should logout and delete session from database", async () => {
    const { cookie } = await createTestUser();
    const sessionToken = cookie.split("=")[1];

    let sessionInDb = await prisma.session.findUnique({
      where: { id: sessionToken },
    });
    expect(sessionInDb).toBeTruthy();

    const authReq = authenticatedRequest(cookie);
    const res = await authReq.post("/api/auth/logout");

    expect(res.status).toBe(200);
    sessionInDb = await prisma.session.findUnique({
      where: { id: sessionToken },
    });
    expect(sessionInDb).toBeNull();
  });
});
