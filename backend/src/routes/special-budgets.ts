import express from "express";

import {
  checkSpecialBudgetAccess,
  requireAuth,
  validateBody,
} from "../middleware";
import {
  addSpecialBudget,
  addSpecialCategory,
  addSpecialExpenses,
  deleteSpecialBudget,
  deleteSpecialCategory,
  deleteSpecialCategoryOnCascade,
  deleteSpecialExpense,
  getAllSpecialBudgets,
  getSpecialBudgetDetails,
  updateSpecialBudget,
  updateSpecialCategoryName,
  updateSpecialExpense,
} from "../controllers";
import {
  categorySchema,
  specialBudgetSchema,
  specialExpenseServerSchema,
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

// Special Categories
router.post(
  "/:id/categories",
  requireAuth,
  validateBody(categorySchema),
  addSpecialCategory
);
router.patch(
  "/:id/categories/:categoryId",
  requireAuth,
  checkSpecialBudgetAccess,
  validateBody(categorySchema),
  updateSpecialCategoryName
);
router.delete(
  "/:id/categories/:categoryId",
  requireAuth,
  checkSpecialBudgetAccess,
  deleteSpecialCategory
);
router.delete(
  "/:id/categories/:categoryId/cascade",
  requireAuth,
  checkSpecialBudgetAccess,
  deleteSpecialCategoryOnCascade
);

// Special Expenses
router.post(
  "/:id/expenses",
  requireAuth,
  checkSpecialBudgetAccess,
  validateBody(specialExpenseServerSchema),
  addSpecialExpenses
);
router.put(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkSpecialBudgetAccess,
  validateBody(specialExpenseServerSchema),
  updateSpecialExpense
);
router.delete(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkSpecialBudgetAccess,
  deleteSpecialExpense
);

export default router;
