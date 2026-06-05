import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../../helpers/auth";
import {
  createMonthlyBudgetInDB,
  createUserInDB,
  deleteUserFromDB,
  getSession,
  updateSessionExpirationInDb,
} from "helpers/db-helpers";

test.describe("Authentication", () => {
  const user = {
    name: "User",
    email: "user@test.com",
    password: "Password1234",
  };

  test.describe("Signup", () => {
    test.afterAll(async () => {
      await deleteUserFromDB(user.email);
    });
    test.beforeEach(async () => {
      await deleteUserFromDB(user.email);
    });

    test(
      "should signup user and redirect to dashboard",
      { tag: ["@smoke", "@regression"] },
      async ({ page }) => {
        await page.goto("/");
        await page.getByTestId("signup-btn").click();
        await expect(page).toHaveURL("/signup");

        await page.fill('input[name="name"]', user.name);
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.click('button[type="submit"]');

        await page.waitForURL("/app");

        const banner = page.getByTestId("app-banner");
        await expect(banner).toBeVisible();
        await expect(banner).toContainText(user.name);
      },
    );

    const registrationCases = [
      {
        name: "",
        email: user.email,
        password: user.password,
        field: "name",
      },
      { name: user.name, email: "", password: user.password, field: "email" },
      { name: user.name, email: user.email, password: "", field: "password" },
    ];

    for (const { name, email, password, field } of registrationCases) {
      test(
        `shouldn't signup user with a missing ${field}`,
        { tag: ["@regression"] },
        async ({ page }) => {
          await page.goto("/signup");

          await page.fill('input[name="name"]', name);
          await page.fill('input[name="email"]', email);
          await page.fill('input[name="password"]', password);
          await page.click('button[type="submit"]');

          const errorMessage = page.getByTestId(`${field}-validation-error`);
          await expect(errorMessage).toBeVisible();
          await expect(page).toHaveURL("/signup");
        },
      );
    }

    const invalidPassword = [
      { password: "Pass123", issue: "too short" },
      { password: "password1", issue: "no uppercase" },
      { password: "PASSWORD1", issue: "no lowercase" },
      { password: "Password", issue: "no number" },
    ];

    for (const { password, issue } of invalidPassword) {
      test(
        `shouldn't signup user with an invalid password - ${issue}`,
        { tag: ["@regression"] },
        async ({ page }) => {
          await page.goto("/signup");

          await page.fill('input[name="name"]', user.name);
          await page.fill('input[name="email"]', user.email);
          await page.fill('input[name="password"]', password);
          await page.click('button[type="submit"]');

          const errorMessage = page.getByTestId("password-validation-error");
          await expect(errorMessage).toBeVisible();
          await expect(page).toHaveURL("/signup");
        },
      );
    }

    test(
      "shouldn't signup user with an existant email",
      { tag: ["@regression"] },
      async ({ page }) => {
        await createUserInDB(user.name, user.email, user.password);

        await page.goto("/signup");

        await page.fill('input[name="name"]', "Duplicate user");
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', "Password1234");
        await page.click('button[type="submit"]');

        const errorMessage = page.getByTestId("signup-error");
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/signup");
      },
    );

    test(
      "should signup user with special char in password and redirect to dashboard",
      { tag: ["@regression"] },
      async ({ page }) => {
        await page.goto("/signup");

        await page.fill('input[name="name"]', user.name);
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', "Abc123!@#$%");
        await page.click('button[type="submit"]');

        await page.waitForURL("/app");

        const banner = page.getByTestId("app-banner");
        await expect(banner).toBeVisible();
        await expect(banner).toContainText(user.name);
      },
    );
  });

  test.describe("Login", () => {
    test(
      "should login user and redirect to dashboard",
      { tag: ["@smoke", "@regression"] },
      async ({ page, user }) => {
        await page.goto("/");
        await page.getByTestId("login-btn").click();
        await expect(page).toHaveURL("/login");

        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.click('button[type="submit"]');

        await page.waitForURL("/app");

        const banner = page.getByTestId("app-banner");
        await expect(banner).toBeVisible();
        await expect(banner).toContainText(user.name);
      },
    );

    test(
      "shouldn't login user with invalid password",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await page.goto("/login");

        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', "WrongPassword1234");
        await page.click('button[type="submit"]');

        const errorMessage = page.getByTestId("login-error");
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/login");
      },
    );

    test(
      "shouldn't login user with invalid email",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await page.goto("/login");

        await page.fill('input[name="email"]', "test@example.com");
        await page.fill('input[name="password"]', user.password);
        await page.click('button[type="submit"]');

        const errorMessage = page.getByTestId("login-error");
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/login");
      },
    );

    const connectionCases = [
      { email: "", password: "Password1234", field: "email", issue: "empty" },
      {
        email: "user@test.com",
        password: "",
        field: "password",
      },
    ];

    for (const { email, password, field } of connectionCases) {
      test(`shouldn't login user with an empty ${field}`, async ({ page }) => {
        await page.goto("/login");

        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', password);
        await page.click('button[type="submit"]');

        const errorMessage = page.getByTestId(`${field}-validation-error`);
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/login");
      });
    }
  });

  test.describe("Logout", () => {
    test(
      "should logout user and blocks access to protected pages ",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);

        await page.getByTestId("nav-menu").click();
        await page.getByTestId("logout-btn").click();

        await expect(page).toHaveURL("/login");

        await page.goto("/app");
        await expect(page).toHaveURL("/login");
      },
    );

    test(
      "logout should delete session cookie",
      { tag: ["@regression"] },
      async ({ page, user, context }) => {
        await loginUser(page, user.email, user.password);

        await page.getByTestId("nav-menu").click();
        await page.getByTestId("logout-btn").click();

        await expect(page).toHaveURL("/login");

        const cookies = await context.cookies();
        const sessionCookie = cookies.find((c) => c.name === "session");
        expect(sessionCookie).toBeUndefined();
      },
    );
  });

  test.describe("Session managment", () => {
    test(
      "should refresh session expiration when doing authenticated action (< 7 days)",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        const expiry = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

        await loginUser(page, user.email, user.password);
        await updateSessionExpirationInDb(user.id, expiry);

        await page.goto("/app");

        const session = await getSession(user.id);
        expect(session?.expiresAt.getTime()).toBeCloseTo(expiry.getTime(), -3);
      },
    );

    test("shouldn't refresh session expiration when doing authenticated action (> 7 days)", async ({
      page,
      user,
    }) => {
      const expiry = new Date(Date.now() + 9 * 24 * 60 * 60 * 1000);

      await loginUser(page, user.email, user.password);
      await updateSessionExpirationInDb(user.id, expiry);

      await page.goto("/app");

      const session = await getSession(user.id);
      expect(session?.expiresAt.getTime()).toBeCloseTo(expiry.getTime(), -3);
    });

    test(
      "should redirect to login page when accessing protected page with expired session",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);
        await updateSessionExpirationInDb(user.id, new Date(Date.now() - 1000));

        await page.goto("/app");

        await expect(page).toHaveURL("/login");
      },
    );

    test(
      "should redirect to login page when accessing protected page without auth",
      { tag: ["@regression"] },
      async ({ page }) => {
        await page.goto("/app");

        await expect(page).toHaveURL("/login");
      },
    );
  });
});
