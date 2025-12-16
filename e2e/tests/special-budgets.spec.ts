import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import {
  createSpecialBudgetInDB,
  createSpecialCategoryInDB,
  deleteAllSpecialBudgetsInDB,
} from "helpers/db-helpers";
import { accessProjectDetails } from "helpers/special-budgets";

test.describe("Special budgets", () => {
  let specialBudget: Awaited<ReturnType<typeof createSpecialBudgetInDB>>;
  test.beforeAll(async ({ user }) => {
    specialBudget = await createSpecialBudgetInDB(user.id);
  });
  test.afterAll(async ({ user }) => {
    await deleteAllSpecialBudgetsInDB(user.id);
  });
  test("should display special budget if exists", async ({ page, user }) => {
    await loginUser(page, user.email, user.password);

    await page.click('[data-testid="projects-nav"]');

    const budgetCard = page.locator('[data-testid="special-budget-card"]', {
      hasText: specialBudget.name,
    });
    await expect(budgetCard).toBeVisible();
    await budgetCard.click();

    await expect(page).toHaveURL(/\/app\/projects\/.+/);
    await expect(page.locator('[data-testid="app-banner"]')).toContainText(
      specialBudget.name
    );
    await expect(
      page.locator('[data-testid="remaining-budget"]')
    ).toContainText(String(specialBudget.remainingBudget));
    await expect(
      page.locator('[data-testid="remaining-budget-base"]')
    ).toContainText(String(specialBudget.totalBudget));
  });

  test("should create a new special budget", async ({ page, user }) => {
    await loginUser(page, user.email, user.password);

    const newProject = { name: "Project 1", totalBudget: "100" };

    await page.click('[data-testid="projects-nav"]');
    await page.click('[data-testid="create-project-btn"]');

    await expect(page.locator('[data-testid="project-form"]')).toBeVisible();
    await page.fill('input[name="name"]', newProject.name);
    await page.fill('input[name="amount"]', newProject.totalBudget);
    await page.click('[data-testid="create-project"]');

    await expect(page).toHaveURL(/\/app\/projects\/.+/);
    await expect(page.locator('[data-testid="app-banner"]')).toContainText(
      newProject.name
    );
    await expect(
      page.locator('[data-testid="remaining-budget"]')
    ).toContainText(newProject.totalBudget);
    await expect(
      page.locator('[data-testid="remaining-budget-base"]')
    ).toContainText(newProject.totalBudget);
  });

  test("should update a special budget", async ({ page, user }) => {
    await loginUser(page, user.email, user.password);

    const updatedBudget = { name: "Updated Project", totalBudget: "200" };

    await accessProjectDetails(page, specialBudget.name);

    await page.click('[data-testid="special-budget-options"]');
    await page.click('[data-testid="update-special-budget-btn"]');

    await expect(page.locator('[data-testid="project-form"]')).toBeVisible();
    await page.fill('input[name="name"]', updatedBudget.name);
    await page.fill('input[name="amount"]', updatedBudget.totalBudget);
    await page.click('[data-testid="edit-project"]');

    await expect(page.locator('[data-testid="app-banner"]')).toContainText(
      updatedBudget.name
    );
    await expect(
      page.locator('[data-testid="remaining-budget"]')
    ).toContainText(updatedBudget.totalBudget);
    await expect(
      page.locator('[data-testid="remaining-budget-base"]')
    ).toContainText(updatedBudget.totalBudget);

    specialBudget = {
      ...specialBudget,
      name: updatedBudget.name,
      totalBudget: Number(updatedBudget.totalBudget),
      remainingBudget: Number(updatedBudget.totalBudget),
    };
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
      catSection.locator('[data-testid="add-special-expense-input"]')
    ).toBeVisible();
    await expect(
      catSection.locator('[data-testid="total-data"]')
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
      }
    );
    await expect(catSection).not.toBeVisible();
    await expect(updatedCatSection).toBeVisible();
  });

  test("should delete a special budget", async ({ page, user }) => {
    await loginUser(page, user.email, user.password);

    await accessProjectDetails(page, specialBudget.name);

    await page.click('[data-testid="special-budget-options"]');
    await page.click('[data-testid="delete-special-budget-btn"]');

    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    await page.click('[data-testid="confirm-delete-btn"]');

    await expect(page).toHaveURL("/app/projects");

    const budgetCard = page.locator('[data-testid="special-budget-card"]', {
      hasText: specialBudget.name,
    });
    await expect(budgetCard).not.toBeVisible();
  });
});
