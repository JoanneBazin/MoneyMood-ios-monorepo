import { expect, test } from "fixtures/user.fixture";
import { getStoredUser, loginUser } from "../helpers/auth";

test.describe("Authentication", () => {
  test("should signup user and redirect to dashboard", async ({ page }) => {
    const signupUser = {
      name: "Signup User",
      email: "signup-user@test.com",
      password: "Password123",
    };
    await page.goto("/signup");
    await page.fill('input[name="name"]', signupUser.name);
    await page.fill('input[name="email"]', signupUser.email);
    await page.fill('input[name="password"]', signupUser.password);
    await page.click('button[type="submit"]');

    await page.waitForURL("/app");

    const storedUser = await getStoredUser(page);
    expect(storedUser).toMatchObject({
      id: expect.any(String),
      name: signupUser.name,
      email: signupUser.email,
    });

    const banner = page.locator("[data-testid='app-banner']");
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(signupUser.name);
  });

  test("should login user and redirect to dashboard", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);

    const storedUser = await getStoredUser(page);
    expect(storedUser).toMatchObject({
      id: expect.any(String),
      name: user.name,
      email: user.email,
    });

    const banner = page.locator("[data-testid='app-banner']");
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(user.name);
  });

  test("should logout user and redirect to home", async ({ page, user }) => {
    await loginUser(page, user.email, user.password);

    await page.click('button[data-testid="nav-menu"]');
    await page.click('button[data-testid="logout-btn"]');

    await page.waitForURL("/");

    const storageData = await getStoredUser(page);
    expect(storageData).toBeNull();
  });
});
