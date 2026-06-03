import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import {
  createMonthlyBudgetInDB,
  createMonthlyExpenseInDB,
  createUserInDB,
  resetUserData,
} from "helpers/db-helpers";
import { accessProfileSettings } from "helpers/profile";

test.describe("User profile", () => {
  test(
    "should update user name and email",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);
      await accessProfileSettings(page);
      const newUser = { name: "Updated Name", email: "updated@test.com" };

      const banner = page.getByTestId("app-banner");
      const nameInput = page.getByTestId("user-name-input");
      const emailInput = page.getByTestId("user-email-input");
      const updateButton = page.getByTestId("update-user-submit");

      await expect(banner).toContainText(user.name);
      await expect(banner).toContainText(user.email);
      await expect(nameInput).toHaveValue(user.name);
      await expect(emailInput).toHaveValue(user.email);
      await expect(updateButton).toBeDisabled();

      await nameInput.fill(newUser.name);
      await emailInput.fill(newUser.email);
      await updateButton.click();

      await expect(updateButton).toBeDisabled();
      await expect(banner).toContainText(newUser.name);
      await expect(banner).toContainText(newUser.email);

      await resetUserData(user.id, user.name, user.email);
    },
  );

  test(
    "should fail update if using existant email",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      const existantUser = {
        name: "Existant User",
        email: "test@example.com",
        password: "Pass1234",
      };
      await createUserInDB(
        existantUser.name,
        existantUser.email,
        existantUser.password,
      );

      await loginUser(page, user.email, user.password);
      await accessProfileSettings(page);

      await page.getByTestId("user-email-input").fill(existantUser.email);
      await page.getByTestId("update-user-submit").click();

      await expect(page.getByTestId("update-req-error")).toBeVisible();
      await expect(page.getByTestId("app-banner")).toContainText(user.email);
    },
  );

  const updateCases = [
    {
      value: "U'ser",
      field: "name",
      issue: "invalid",
    },
    {
      value: "",
      field: "name",
      issue: "empty",
    },
    {
      value: "usertest.com",
      field: "email",
      issue: "invalid",
    },
    {
      value: "",
      field: "email",
      issue: "empty",
    },
  ];

  for (const { value, field, issue } of updateCases) {
    test(`shouldn't update user with a ${issue} ${field}`, async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);
      await accessProfileSettings(page);

      await page.getByTestId(`user-${field}-input`).fill(value);
      await page.getByTestId("update-user-submit").click();

      await expect(page.getByTestId(`${field}-input-error`)).toBeVisible();
    });
  }

  test("should activate expense validation option", async ({ page, user }) => {
    await loginUser(page, user.email, user.password);
    const { id: budgetId } = await createMonthlyBudgetInDB(user.id);
    const expense = await createMonthlyExpenseInDB(budgetId);

    await accessProfileSettings(page);

    await page.getByTestId("expense-validation-checkbox").check();
    await page.getByTestId("update-user-submit").click();

    await page.goto("/app");

    const expenseItem = page.getByTestId("data-item").filter({
      hasText: expense.name,
    });
    await expenseItem.getByTestId("expense-validation-btn").click();

    await expect(expenseItem.getByTestId("data-item-name")).toHaveClass(
      /(^|\s)cashed(\s|$)/,
    );
  });
});
