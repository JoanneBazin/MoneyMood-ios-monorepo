import { test } from "fixtures/user.fixture";
import { deleteAllSpecialBudgetsInDB } from "helpers/db-helpers";

test.describe("Special categories", () => {
  test.afterAll(async ({ user }) => {
    await deleteAllSpecialBudgetsInDB(user.id);
  });

  test("should add a new category to a special budget", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);

    const cat = { name: "New category" };

    await accessProjectDetails(page, specialBudget.name);

    await page.click('[data-testid="add-special-cat-btn"]');

    await expect(page.locator('[data-testid="cat-form"]')).toBeVisible();
    await page.fill('input[name="name"]', cat.name);
    await page.click('[data-testid="create-cat"]');

    const catSection = page.locator('[data-testid="special-cat-section"]', {
      hasText: cat.name,
    });

    await expect(catSection).toBeVisible();
    await expect(
      catSection.locator('[data-testid="add-special-expense-input"]'),
    ).toBeVisible();
    await expect(
      catSection.locator('[data-testid="total-data"]'),
    ).toBeVisible();
  });

  test("should update a special category", async ({ page, user }) => {
    await loginUser(page, user.email, user.password);
    const existantCat = await createSpecialCategoryInDB(specialBudget.id);
    const updatedCat = { name: "Updated category" };

    await accessProjectDetails(page, specialBudget.name);

    const catSection = page.locator('[data-testid="special-cat-section"]', {
      hasText: existantCat.name,
    });
    await catSection.locator('[data-testid="update-cat-btn"]').click();

    await expect(page.locator('[data-testid="cat-form"]')).toBeVisible();
    await page.fill('input[name="name"]', updatedCat.name);
    await page.click('[data-testid="update-cat"]');

    const updatedCatSection = page.locator(
      '[data-testid="special-cat-section"]',
      {
        hasText: updatedCat.name,
      },
    );
    await expect(catSection).not.toBeVisible();
    await expect(updatedCatSection).toBeVisible();
  });
});
