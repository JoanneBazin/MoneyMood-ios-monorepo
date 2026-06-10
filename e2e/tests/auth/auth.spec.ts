import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../../helpers/auth";
import {
  createUserInDB,
  deleteUserFromDB,
  getSession,
  updateSessionExpirationInDb,
} from "helpers/db-helpers";
import { qase } from "playwright-qase-reporter";

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
        qase.id(1);
        qase.title("Inscription - Données valides - Compte créé");

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
          qase.id(2);
          qase.title("Inscription - Champ vide - Erreur de validation");

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
          qase.id(5);
          qase.title(
            "Inscription - Format mdp invalide - Erreur de validation",
          );

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
        qase.id(11);
        qase.title("Inscription - Email existant - Inscription rejetée");

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
        qase.id(54);
        qase.title(
          "Inscription - Caractères spéciaux légitimes dans mdp - Compte créé",
        );

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
        qase.id(16);
        qase.title("Connexion - Identifiants valides - Connexion réussie");

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
        qase.id(17);
        qase.title("Connexion - Mdp incorrect - Echec de connexion");
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
        qase.id(18);
        qase.title("Connexion - Email inexistant - Echec de connexion");

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
        qase.id(19);
        qase.title("Connexion - Champ vide - Erreur de validation");

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
        qase.id([24, 25]);
        qase.title(
          "Déconnexion - User connecté - Déconnexion réussie -- Accès refusé aux pages protégées",
        );

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
        qase.id(62);
        qase.title(
          "Déconnexion - Après déconnexion - Cookie de session supprimé",
        );
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
        qase.id(26);
        qase.title("Session - Expiration < 7 jours - Prolongation de session");

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
      qase.id(27);
      qase.title(
        "Session - Expiration > 7 jours - Non-prolongation de session",
      );
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
        qase.id(28);
        qase.title("Session - Expiration de session - Déconnexion automatique");
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
        qase.id([29, 30]);
        qase.title(
          "Session - Pas de session - Accès non autorisé aux pages protégées -- Accès pages publiques",
        );
        await page.goto("/app");

        await expect(page).toHaveURL("/login");
      },
    );
  });
});
