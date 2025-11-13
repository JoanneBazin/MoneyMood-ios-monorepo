import express from "express";

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
  updateSpecialBudget,
  updateSpecialExpense,
} from "../controllers";
import {
  specialBudgetSchema,
  specialExpenseEntrySchema,
  updateExpenseEntrySchema,
} from "@moneymood-monorepo/shared";

const router = express.Router();

// Special Budget general routes
router.post(
  "/",
  requireAuth,
  validateBody(specialBudgetSchema),
  addSpecialBudget
);
router.get("/", requireAuth, getAllSpecialBudgets);
router.get("/:id", requireAuth, getSpecialBudgetDetails);
router.put(
  "/:id",
  requireAuth,
  validateBody(specialBudgetSchema),
  updateSpecialBudget
);
router.delete("/:id", requireAuth, deleteSpecialBudget);

// Special Expenses
router.post(
  "/:id/expenses",
  requireAuth,
  checkSpecialBudgetAccess,
  validateBody(specialExpenseEntrySchema),
  addSpecialExpenses
);
router.put(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkSpecialBudgetAccess,
  validateBody(updateExpenseEntrySchema),
  updateSpecialExpense
);
router.delete(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkSpecialBudgetAccess,
  deleteSpecialExpense
);

export default router;
