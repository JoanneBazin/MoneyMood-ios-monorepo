import request from "supertest";
import app from "../../app";

export const createTestUser = async (email = "test@example.com") => {
  const userData = {
    email,
    password: "Pass1234",
    name: "Test User",
  };
  const signupRes = await request(app).post("/api/auth/signup").send(userData);

  const cookies = signupRes.headers["set-cookie"];
  let authCookie = "";

  if (Array.isArray(cookies)) {
    const sessionCookie = cookies.find((cookie: string) =>
      cookie.startsWith("session=")
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
    response: signupRes,
  };
};

export const authenticatedRequest = (cookie: string) => ({
  get: (url: string) => request(app).get(url).set("Cookie", cookie),
  post: (url: string) => request(app).post(url).set("Cookie", cookie),
  put: (url: string) => request(app).put(url).set("Cookie", cookie),
  delete: (url: string) => request(app).delete(url).set("Cookie", cookie),
});
