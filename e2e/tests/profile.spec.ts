import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import { deleteAllFixedEntriesInDB } from "helpers/db-helpers";

test.describe("User profile - fixed incomes/charges", () => {
  test.afterAll(async ({ user }) => {
    await deleteAllFixedEntriesInDB(user.id);
  });

  test("should add new fixed incomes and charges and fill monthly budget form fields", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const charges = [
      { name: "charge 1", amount: "10" },
      { name: "charge 2", amount: "10" },
    ];
    const incomes = [
      { name: "income 1", amount: "100" },
      { name: "income 2", amount: "100" },
    ];
    const totalCharges = charges
      .map((c) => Number(c.amount))
      .reduce((acc, curr) => acc + curr, 0);
    const totalIncomes = incomes
      .map((i) => Number(i.amount))
      .reduce((acc, curr) => acc + curr, 0);

    await page.click('[data-testid="nav-menu"]');
    await page.click('[data-testid="profile-nav"]');
    const totalData = page.locator('[data-testid="total-data"]');

    for (let i = 0; i < incomes.length; i++) {
      await page.click('[data-testid="add-incomes-input"]');
      await page.fill(
        `[data-testid="incomes-name-input-${i}"]`,
        incomes[i].name
      );
      await page.fill(
        `[data-testid="incomes-amount-input-${i}"]`,
        incomes[i].amount
      );
    }
    await page.click('[data-testid="add-incomes-btn"]');
    await expect(totalData.first()).toContainText(String(totalIncomes));

    for (let i = 0; i < charges.length; i++) {
      await page.click('[data-testid="add-charges-input"]');
      await page.fill(
        `[data-testid="charges-name-input-${i}"]`,
        charges[i].name
      );
      await page.fill(
        `[data-testid="charges-amount-input-${i}"]`,
        charges[i].amount
      );
    }
    await page.click('[data-testid="add-charges-btn"]');
    await expect(
      totalData.filter({ hasText: String(totalCharges) })
    ).toBeVisible();

    await page.click('[data-testid="back-arrow"]');
    await page.click('[data-testid="create-nav"]');

    for (let i = 0; i < incomes.length; i++) {
      const nameInput = page.locator(`[data-testid="incomes-name-input-${i}"]`);
      const amountInput = page.locator(
        `[data-testid="incomes-amount-input-${i}"]`
      );

      await expect(nameInput).toBeVisible();
      await expect(amountInput).toBeVisible();

      await expect(nameInput).toHaveValue(incomes[i].name);
      await expect(amountInput).toHaveValue(incomes[i].amount);
    }
    for (let i = 0; i < charges.length; i++) {
      const nameInput = page.locator(`[data-testid="charges-name-input-${i}"]`);
      const amountInput = page.locator(
        `[data-testid="charges-amount-input-${i}"]`
      );

      await expect(nameInput).toBeVisible();
      await expect(amountInput).toBeVisible();

      await expect(nameInput).toHaveValue(charges[i].name);
      await expect(amountInput).toHaveValue(charges[i].amount);
    }
  });
});
