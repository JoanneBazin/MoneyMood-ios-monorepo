import express from "express";
import {
  createSpecialBudgetSchema,
  createSpecialExpenseEntrySchema,
  specialExpenseEntrySchema,
} from "@moneymood-monorepo/shared";
import {
  checkSpecialBudgetAccess,
  requireAuth,
  validateBody,
} from "../middleware";
import {
  addSpecialBudget,
  addSpecialExpenses,
  deleteSpecialBudget,
  deleteSpecialExpense,
  getAllSpecialBudgets,
  getSpecialBudgetDetails,
  updateSpecialExpense,
} from "src/controllers";

const router = express.Router();

// Special Budget general routes
router.post(
  "/",
  requireAuth,
  validateBody(createSpecialBudgetSchema),
  addSpecialBudget
);
router.get("/", requireAuth, getAllSpecialBudgets);
router.get("/:id", requireAuth, getSpecialBudgetDetails);
router.delete("/:id", requireAuth, deleteSpecialBudget);

// Special Expenses
router.post(
  "/:id/expenses",
  requireAuth,
  checkSpecialBudgetAccess,
  validateBody(createSpecialExpenseEntrySchema),
  addSpecialExpenses
);
router.put(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkSpecialBudgetAccess,
  validateBody(specialExpenseEntrySchema),
  updateSpecialExpense
);
router.delete(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkSpecialBudgetAccess,
  deleteSpecialExpense
);

export default router;
