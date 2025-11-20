import express from "express";

import {
  checkBudgetAccess,
  requireAuth,
  validateBody,
  validateQuery,
} from "../middleware";
import {
  addMonthlyBudget,
  addMonthlyCharges,
  addMonthlyExpenses,
  addMonthlyIncomes,
  deleteMonthlyBudget,
  deleteMonthlyCharge,
  deleteMonthlyExpense,
  deleteMonthlyIncome,
  getCurrentMonthlyBudget,
  getLastBudgets,
  getMonthlyBudget,
  getMonthlyBudgetById,
  updateMonthlyBudgetStatus,
  updateMonthlyCharge,
  updateMonthlyExpense,
  updateMonthlyIncome,
} from "../controllers";
import {
  baseEntryServerSchema,
  monthlyBudgetSchema,
  queryDateSchema,
  updateCurrentStatusSchema,
  expenseServerSchema,
} from "@moneymood-monorepo/shared";

const router = express.Router();

// Monthly Budget general routes
router.post(
  "/",
  requireAuth,
  validateBody(monthlyBudgetSchema),
  addMonthlyBudget
);
router.get("/", requireAuth, validateQuery(queryDateSchema), getMonthlyBudget);
router.get("/current", requireAuth, getCurrentMonthlyBudget);
router.get("/history", requireAuth, getLastBudgets);
router.get("/:id", requireAuth, getMonthlyBudgetById);
router.patch(
  "/:id",
  requireAuth,
  validateBody(updateCurrentStatusSchema),
  updateMonthlyBudgetStatus
);
router.delete("/:id", requireAuth, deleteMonthlyBudget);

// Monthly incomes
router.post(
  "/:id/incomes",
  requireAuth,
  checkBudgetAccess,
  validateBody(baseEntryServerSchema),
  addMonthlyIncomes
);
router.put(
  "/:id/incomes/:incomeId",
  requireAuth,
  checkBudgetAccess,
  validateBody(baseEntryServerSchema),
  updateMonthlyIncome
);
router.delete(
  "/:id/incomes/:incomeId",
  requireAuth,
  checkBudgetAccess,
  deleteMonthlyIncome
);

// Monthly charges
router.post(
  "/:id/charges",
  requireAuth,
  checkBudgetAccess,
  validateBody(baseEntryServerSchema),
  addMonthlyCharges
);
router.put(
  "/:id/charges/:chargeId",
  requireAuth,
  checkBudgetAccess,
  validateBody(baseEntryServerSchema),
  updateMonthlyCharge
);
router.delete(
  "/:id/charges/:chargeId",
  requireAuth,
  checkBudgetAccess,
  deleteMonthlyCharge
);

// Monthly Expenses
router.post(
  "/:id/expenses",
  requireAuth,
  checkBudgetAccess,
  validateBody(expenseServerSchema),
  addMonthlyExpenses
);
router.put(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkBudgetAccess,
  validateBody(baseEntryServerSchema),
  updateMonthlyExpense
);
router.delete(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkBudgetAccess,
  deleteMonthlyExpense
);

export default router;
