import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import { getCurrencyValue } from "helpers/budget";
import {
  createSpecialBudgetInDB,
  createSpecialBudgetWithCatAndExpenses,
  createSpecialCategoryInDB,
  deleteAllSpecialBudgetsInDB,
} from "helpers/db-helpers";
import { fillCategoryForm } from "helpers/special-budgets";

test.describe("Project categories", () => {
  test.afterAll(async ({ user }) => {
    await deleteAllSpecialBudgetsInDB(user.id);
  });

  test.describe("Category creation", () => {
    let specialBudget: Awaited<ReturnType<typeof createSpecialBudgetInDB>>;

    test.beforeEach(async ({ user }) => {
      specialBudget = await createSpecialBudgetInDB(user.id);
    });
    test.afterEach(async ({ user }) => {
      await deleteAllSpecialBudgetsInDB(user.id);
    });

    test(
      "should add a new category to a project",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);
        await page.goto(`/app/projects/${specialBudget.id}`);

        const cat = { name: "New category" };

        await page.getByTestId("add-special-cat-btn").click();
        await fillCategoryForm(page, "create", cat);

        const catSection = page.getByTestId("special-cat-section").filter({
          hasText: cat.name,
        });

        await expect(catSection).toBeVisible();
        await expect(
          catSection.getByTestId("add-special-expenses-input"),
        ).toBeVisible();
        await expect(catSection.getByTestId("data-item")).toHaveCount(0);
        const totalCatExpenses = await getCurrencyValue(
          catSection.getByTestId("total-data-amount"),
        );
        expect(totalCatExpenses).toBe(0);
      },
    );

    test("should failed adding a new category with existant category name for this project", async ({
      page,
      user,
    }) => {
      const existantCat = await createSpecialCategoryInDB(specialBudget.id);
      await loginUser(page, user.email, user.password);
      await page.goto(`/app/projects/${specialBudget.id}`);

      await page.getByTestId("add-special-cat-btn").click();
      await fillCategoryForm(page, "create", { name: existantCat.name });

      await expect(page.getByTestId("error-message")).toBeVisible();
      await expect(page.getByTestId("cat-form")).toBeVisible();
    });

    test("should failed adding a new category with empty name", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);
      await page.goto(`/app/projects/${specialBudget.id}`);

      await page.getByTestId("add-special-cat-btn").click();
      await fillCategoryForm(page, "create", { name: "" });

      await expect(page.getByTestId("name-validation-error")).toBeVisible();
      await expect(page.getByTestId("cat-form")).toBeVisible();
    });
  });

  test.describe("Category managment", () => {
    let specialBudget: Awaited<
      ReturnType<typeof createSpecialBudgetWithCatAndExpenses>
    >;

    test.beforeEach(async ({ user }) => {
      specialBudget = await createSpecialBudgetWithCatAndExpenses(user.id);
    });
    test.afterEach(async ({ user }) => {
      await deleteAllSpecialBudgetsInDB(user.id);
    });

    test(
      "should update a project category",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);
        await page.goto(`/app/projects/${specialBudget.id}`);

        const category = specialBudget.category;
        const updatedName = "Updated category";

        const catSection = page.getByTestId("special-cat-section").filter({
          hasText: category.name,
        });
        await expect(catSection).toBeVisible();
        const catExpense = catSection.getByTestId("data-item").filter({
          hasText: category.expense.name,
        });
        await expect(catExpense).toBeVisible();

        await catSection.getByTestId("update-cat-btn").click();
        await fillCategoryForm(page, "edit", { name: updatedName });

        await expect(page.getByTestId("cat-form")).not.toBeVisible();
        await expect(catSection).not.toBeVisible();
        const updatedCatSection = page
          .getByTestId("special-cat-section")
          .filter({
            hasText: updatedName,
          });
        await expect(updatedCatSection).toBeVisible();
        await expect(
          updatedCatSection.getByTestId("data-item").filter({
            hasText: category.expense.name,
          }),
        ).toBeVisible();
      },
    );

    test("should failded updating with existant category name for this project", async ({
      page,
      user,
    }) => {
      const existantCat = await createSpecialCategoryInDB(specialBudget.id);
      await loginUser(page, user.email, user.password);
      await page.goto(`/app/projects/${specialBudget.id}`);

      const category = specialBudget.category;

      const catSection = page.getByTestId("special-cat-section").filter({
        hasText: category.name,
      });
      await expect(catSection).toBeVisible();

      await catSection.getByTestId("update-cat-btn").click();
      await fillCategoryForm(page, "edit", { name: existantCat.name });

      await expect(page.getByTestId("error-message")).toBeVisible();
      await expect(page.getByTestId("cat-form")).toBeVisible();
    });

    test("should failded updating with empty name", async ({ page, user }) => {
      await loginUser(page, user.email, user.password);
      await page.goto(`/app/projects/${specialBudget.id}`);

      const category = specialBudget.category;

      const catSection = page.getByTestId("special-cat-section").filter({
        hasText: category.name,
      });
      await expect(catSection).toBeVisible();

      await catSection.getByTestId("update-cat-btn").click();
      await fillCategoryForm(page, "edit", { name: "" });

      await expect(page.getByTestId("name-validation-error")).toBeVisible();
      await expect(page.getByTestId("cat-form")).toBeVisible();
    });

    test(
      "should delete a project category and update their expenses (uncategorised by default)",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);
        await page.goto(`/app/projects/${specialBudget.id}`);

        const category = specialBudget.category;

        const catSection = page.getByTestId("special-cat-section").filter({
          hasText: category.name,
        });
        await expect(catSection).toBeVisible();
        const catExpense = catSection.getByTestId("data-item").filter({
          hasText: category.expense.name,
        });
        await expect(catExpense).toBeVisible();

        const expensesWithoutCatContainer =
          page.getByTestId("expenses-section");
        const previousTotalExpensesWithoutCat = await getCurrencyValue(
          expensesWithoutCatContainer.getByTestId("total-data-amount"),
        );

        await catSection.getByTestId("update-cat-btn").click();

        await expect(page.getByTestId("cat-form")).toBeVisible();
        await page.getByTestId("delete-cat-btn").click();

        await expect(page.getByTestId("delete-cat-cascade")).toBeVisible();
        await expect(page.getByTestId("delete-cat-only")).toBeVisible();
        await expect(page.getByTestId("delete-cat-cancel")).toBeVisible();
        await page.getByTestId("delete-cat-only").click();

        await expect(page.getByTestId("cat-form")).not.toBeVisible();
        await expect(catSection).not.toBeVisible();
        await expect(catExpense).not.toBeVisible();

        const expenseWithoutCat = expensesWithoutCatContainer
          .getByTestId("data-item")
          .filter({
            hasText: category.expense.name,
          });
        await expect(expenseWithoutCat).toBeVisible();

        const currentTotalExpensesWithoutCat = await getCurrencyValue(
          expensesWithoutCatContainer.getByTestId("total-data-amount"),
        );
        expect(currentTotalExpensesWithoutCat).toBe(
          previousTotalExpensesWithoutCat + category.expense.amount,
        );
      },
    );

    test(
      "should delete a project category and all of their expenses in cascade",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);
        await page.goto(`/app/projects/${specialBudget.id}`);

        const category = specialBudget.category;

        const remainingContainer = page.getByTestId("remaining-budget");
        const previousRemainingBudget = await getCurrencyValue(
          remainingContainer.getByTestId("total-budget-amount"),
        );

        const catSection = page.getByTestId("special-cat-section").filter({
          hasText: category.name,
        });
        await expect(catSection).toBeVisible();
        const catExpense = catSection.getByTestId("data-item").filter({
          hasText: category.expense.name,
        });
        await expect(catExpense).toBeVisible();

        await catSection.getByTestId("update-cat-btn").click();

        await expect(page.getByTestId("cat-form")).toBeVisible();
        await page.getByTestId("delete-cat-btn").click();
        await page.getByTestId("delete-cat-cascade").click();

        await expect(page.getByTestId("cat-form")).not.toBeVisible();
        await expect(catSection).not.toBeVisible();
        await expect(catExpense).not.toBeVisible();

        await expect(
          page.getByTestId("data-item").filter({
            hasText: category.expense.name,
          }),
        ).not.toBeVisible();

        const currentRemainingBudget = await getCurrencyValue(
          remainingContainer.getByTestId("total-budget-amount"),
        );
        expect(currentRemainingBudget).toBe(
          previousRemainingBudget + category.expense.amount,
        );
      },
    );

    test("should cancel category deletion before request", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);
      await page.goto(`/app/projects/${specialBudget.id}`);

      const category = specialBudget.category;

      const remainingContainer = page.getByTestId("remaining-budget");
      const previousRemainingBudget = await getCurrencyValue(
        remainingContainer.getByTestId("total-budget-amount"),
      );

      const catSection = page.getByTestId("special-cat-section").filter({
        hasText: category.name,
      });
      await expect(catSection).toBeVisible();
      const catExpense = catSection.getByTestId("data-item").filter({
        hasText: category.expense.name,
      });
      await expect(catExpense).toBeVisible();

      await catSection.getByTestId("update-cat-btn").click();

      await expect(page.getByTestId("cat-form")).toBeVisible();
      await page.getByTestId("delete-cat-btn").click();
      await page.getByTestId("delete-cat-cancel").click();
      await page.getByTestId("dialog-close").click();

      await expect(page.getByTestId("cat-form")).not.toBeVisible();
      await expect(catSection).toBeVisible();
      await expect(catExpense).toBeVisible();

      const currentRemainingBudget = await getCurrencyValue(
        remainingContainer.getByTestId("total-budget-amount"),
      );
      expect(currentRemainingBudget).toBe(previousRemainingBudget);
    });
  });
});
