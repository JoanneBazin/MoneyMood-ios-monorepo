import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import { getCurrencyValue, getProjectTotals } from "helpers/budget";
import {
  createMultipleSpecialBudgets,
  createSpecialBudgetInDB,
  createSpecialBudgetWithCatAndExpenses,
  deleteAllSpecialBudgetsInDB,
} from "helpers/db-helpers";
import { fillProjectForm } from "helpers/special-budgets";
import { qase } from "playwright-qase-reporter";

test.describe("Special budgets", () => {
  test.afterAll(async ({ user }) => {
    await deleteAllSpecialBudgetsInDB(user.id);
  });

  test.describe("Project display", () => {
    test.beforeEach(async ({ user }) => {
      await deleteAllSpecialBudgetsInDB(user.id);
    });

    test("should display special budgets ordered from most recent to oldest", async ({
      page,
      user,
    }) => {
      qase.id(178);
      qase.title("Consultation projet - Projets créés - Affichage de la liste");

      const budgetCount = 3;
      const specialBudgets = await createMultipleSpecialBudgets(
        user.id,
        budgetCount,
      );
      await loginUser(page, user.email, user.password);

      await page.getByTestId("projects-nav").click();

      const budgetCards = page.getByTestId("special-budget-card");
      await expect(budgetCards).toHaveCount(budgetCount);

      for (let i = 0; i < budgetCount; i++) {
        await expect(budgetCards.nth(i)).toContainText(specialBudgets[i].name);
        await expect(budgetCards.nth(i)).toContainText(
          specialBudgets[i].createdAt.toLocaleDateString("fr-FR"),
        );
      }
    });

    test(
      "should display special budget details",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        qase.id(180);
        qase.title(
          "Consultation projet - Détails d'un projet - Affichage des données",
        );

        const project = await createSpecialBudgetWithCatAndExpenses(user.id);
        await loginUser(page, user.email, user.password);

        await page.getByTestId("projects-nav").click();

        const budgetCard = page.getByTestId("special-budget-card").filter({
          hasText: project.name,
        });
        await expect(budgetCard).toBeVisible();
        await budgetCard.click();

        await expect(page).toHaveURL(/\/app\/projects\/.+/);
        await expect(page.getByTestId("app-banner")).toContainText(
          project.name,
        );

        const remainingContainer = page.getByTestId("remaining-budget");
        const totalContainer = page.getByTestId("remaining-budget-base");
        const totalBudget = await getCurrencyValue(
          totalContainer.getByTestId("total-budget-amount"),
        );
        const expensesWithoutCatContainer =
          page.getByTestId("expenses-section");
        const expenseWithoutCat = expensesWithoutCatContainer
          .getByTestId("data-item")
          .filter({
            hasText: project.expenseWithoutCat.name,
          });
        await expect(expenseWithoutCat).toBeVisible();
        const categoryContainer = page
          .getByTestId("special-cat-section")
          .filter({
            hasText: project.category.name,
          });
        await expect(categoryContainer).toBeVisible();
        const expenseWithCat = categoryContainer
          .getByTestId("data-item")
          .filter({
            hasText: project.category.expense.name,
          });
        await expect(expenseWithCat).toBeVisible();

        const { totalRemaining, totalExpenses, totalCatExpenses } =
          await getProjectTotals(
            remainingContainer,
            expensesWithoutCatContainer,
            categoryContainer,
          );

        expect(totalRemaining).toBe(project.remainingBudget);
        expect(totalBudget).toBe(project.totalBudget);
        expect(totalExpenses).toBe(project.expenseWithoutCat.amount);
        expect(totalCatExpenses).toBe(project.category.expense.amount);
      },
    );
  });

  test.describe("Project creation", () => {
    test.beforeEach(async ({ user }) => {
      await deleteAllSpecialBudgetsInDB(user.id);
    });

    test(
      "should create a new project",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        qase.id(182);
        qase.title(
          "Gestion projet - Création avec données valides - Création réussie",
        );

        await loginUser(page, user.email, user.password);

        const newProject = { name: "Project 1", totalBudget: "100" };

        await page.goto("/app/projects");
        await page.getByTestId("create-project-btn").click();
        await fillProjectForm(page, "create", newProject);

        await expect(page).toHaveURL(/\/app\/projects\/.+/);
        await expect(page.getByTestId("app-banner")).toContainText(
          newProject.name,
        );
        const remainingContainer = page.getByTestId("remaining-budget");
        const remainingBudget = await getCurrencyValue(
          remainingContainer.getByTestId("total-budget-amount"),
        );
        expect(remainingBudget).toBe(Number(newProject.totalBudget));

        const totalContainer = page.getByTestId("remaining-budget-base");
        const totalBudget = await getCurrencyValue(
          totalContainer.getByTestId("total-budget-amount"),
        );
        expect(totalBudget).toBe(Number(newProject.totalBudget));
      },
    );

    test("should failed creating a new budget if using an existant project name", async ({
      page,
      user,
    }) => {
      qase.id(194);
      qase.title(
        "Gestion projet - Création avec nom existant - Création refusée",
      );

      const existantBudget = await createSpecialBudgetInDB(user.id);
      await loginUser(page, user.email, user.password);

      const newProject = { name: existantBudget.name, totalBudget: "100" };

      await page.goto("/app/projects");
      await page.getByTestId("create-project-btn").click();
      await fillProjectForm(page, "create", newProject);

      await expect(page.getByTestId("project-form")).toBeVisible();
      await expect(page.getByTestId("error-message")).toBeVisible();
    });

    const creationCases = [
      { name: "", amount: "100", field: "name", issue: "empty" },
      {
        name: "Project",
        amount: "",
        field: "amount",
        issue: "empty",
      },
      {
        name: "Project",
        amount: "0",
        field: "amount",
        issue: "invalid",
      },
    ];

    for (const { name, amount, field, issue } of creationCases) {
      test(`should failed creating a new project with ${issue} ${field}`, async ({
        page,
        user,
      }) => {
        qase.id(193);
        qase.title(
          "Gestion projet - Création avec données invalides - Erreur de validation",
        );

        await loginUser(page, user.email, user.password);

        await page.goto("/app/projects");
        await page.getByTestId("create-project-btn").click();
        await fillProjectForm(page, "create", { name, totalBudget: amount });

        await expect(page.getByTestId("project-form")).toBeVisible();
        await expect(
          page.getByTestId(`${field}-validation-error`),
        ).toBeVisible();
      });
    }
  });

  test.describe("Project managment", () => {
    let specialBudget: Awaited<ReturnType<typeof createSpecialBudgetInDB>>;

    test.beforeEach(async ({ user }) => {
      specialBudget = await createSpecialBudgetInDB(user.id);
    });
    test.afterEach(async ({ user }) => {
      await deleteAllSpecialBudgetsInDB(user.id);
    });

    test(
      "should update a special budget",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        qase.id(183);
        qase.title(
          "Gestion projet - Modification avec données valides - Mise à jour réussie",
        );

        await loginUser(page, user.email, user.password);

        const updatedBudget = { name: "Updated Project", totalBudget: "200" };

        await page.goto(`/app/projects/${specialBudget.id}`);

        await page.getByTestId("special-budget-options").click();
        await page.getByTestId("update-special-budget-btn").click();
        await fillProjectForm(page, "edit", updatedBudget);

        await expect(page.getByTestId("app-banner")).toContainText(
          updatedBudget.name,
        );

        const totalContainer = page.getByTestId("remaining-budget-base");
        const totalBudget = await getCurrencyValue(
          totalContainer.getByTestId("total-budget-amount"),
        );
        expect(totalBudget).toBe(Number(updatedBudget.totalBudget));
      },
    );

    test("should failed updating a project with an existant project name", async ({
      page,
      user,
    }) => {
      qase.id(187);
      qase.title(
        "Gestion projet - Modification avec nom existant - Modification refusée",
      );

      const { name, totalBudget } = await createSpecialBudgetInDB(
        user.id,
        "Older project",
      );
      await loginUser(page, user.email, user.password);

      await page.goto(`/app/projects/${specialBudget.id}`);

      await page.getByTestId("special-budget-options").click();
      await page.getByTestId("update-special-budget-btn").click();
      await fillProjectForm(page, "edit", {
        name,
        totalBudget: String(totalBudget),
      });

      await expect(page.getByTestId("project-form")).toBeVisible();
      await expect(page.getByTestId("error-message")).toBeVisible();
    });

    const updatingCases = [
      { name: "", amount: "100", field: "name", issue: "empty" },
      {
        name: "Project",
        amount: "",
        field: "amount",
        issue: "empty",
      },
      {
        name: "Project",
        amount: "0",
        field: "amount",
        issue: "invalid",
      },
    ];
    for (const { name, amount, field, issue } of updatingCases) {
      test(`should failed updating a project with ${issue} ${field}`, async ({
        page,
        user,
      }) => {
        qase.id(188);
        qase.title(
          "Gestion projet - Modification avec données invalides - Erreur de validation",
        );

        await loginUser(page, user.email, user.password);

        await page.goto(`/app/projects/${specialBudget.id}`);

        await page.getByTestId("special-budget-options").click();
        await page.getByTestId("update-special-budget-btn").click();
        await fillProjectForm(page, "edit", { name, totalBudget: amount });

        await expect(page.getByTestId("project-form")).toBeVisible();
        await expect(
          page.getByTestId(`${field}-validation-error`),
        ).toBeVisible();
      });
    }

    test(
      "should delete a special budget",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        qase.id([184, 185]);
        qase.title(
          "Gestion projet - Suppression d'un projet - Demande de confirmation -- Suppression réussie",
        );

        await loginUser(page, user.email, user.password);

        await page.goto(`/app/projects/${specialBudget.id}`);

        await page.getByTestId("special-budget-options").click();
        await page.getByTestId("delete-special-budget-btn").click();

        await expect(page.getByTestId("delete-modal")).toBeVisible();
        await page.getByTestId("confirm-delete-btn").click();

        await expect(page).toHaveURL("/app/projects");

        const budgetCard = page.getByTestId("special-budget-card").filter({
          hasText: specialBudget.name,
        });
        await expect(budgetCard).not.toBeVisible();
      },
    );

    test("should cancel project deletion", async ({ page, user }) => {
      qase.id(186);
      qase.title(
        "Gestion projet - Confirmation de la suppression - Suppression annulée",
      );
      await loginUser(page, user.email, user.password);

      await page.goto(`/app/projects/${specialBudget.id}`);

      await page.getByTestId("special-budget-options").click();
      await page.getByTestId("delete-special-budget-btn").click();

      await expect(page.getByTestId("delete-modal")).toBeVisible();
      await page.getByTestId("cancel-delete-btn").click();

      await expect(page).toHaveURL(/\/app\/projects\/.+/);
      await expect(page.getByTestId("app-banner")).toContainText(
        specialBudget.name,
      );
    });
  });
});
