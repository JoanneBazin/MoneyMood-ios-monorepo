import request from "supertest";
import app from "../../app";
import { createUserInDb } from "./db-helpers";

export const createTestUser = async (email = "test@example.com") => {
  const user = await createUserInDb(email);

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email, password: user.password });

  const cookies = loginRes.headers["set-cookie"];
  let authCookie = "";

  if (Array.isArray(cookies)) {
    const sessionCookie = cookies.find((cookie: string) =>
      cookie.startsWith("session="),
    );
    if (sessionCookie) {
      authCookie = sessionCookie.split(";")[0];
    }
  } else if (typeof cookies === "string") {
    if (cookies.startsWith("session=")) {
      authCookie = cookies.split(";")[0];
    }
  }

  return {
    cookie: authCookie,
    userData: { id: user.id, email: user.email },
  };
};

export const authenticatedRequest = (cookie: string) => ({
  get: (url: string) => request(app).get(url).set("Cookie", cookie),
  post: (url: string) => request(app).post(url).set("Cookie", cookie),
  put: (url: string) => request(app).put(url).set("Cookie", cookie),
  delete: (url: string) => request(app).delete(url).set("Cookie", cookie),
});
