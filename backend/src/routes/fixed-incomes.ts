import express from "express";
import {
  budgetEntrySchema,
  createBudgetEntrySchema,
} from "@moneymood-monorepo/shared";
import { requireAuth, validateBody } from "../middleware";
import {
  addFixedIncomes,
  deleteFixedIncome,
  getFixedIncomes,
  updateFixedIncome,
} from "../controllers";

const router = express.Router();

router.get("/", requireAuth, getFixedIncomes);
router.post(
  "/",
  requireAuth,
  validateBody(createBudgetEntrySchema),
  addFixedIncomes
);
router.put(
  "/:id",
  requireAuth,
  validateBody(budgetEntrySchema),
  updateFixedIncome
);
router.delete("/:id", requireAuth, deleteFixedIncome);

export default router;
