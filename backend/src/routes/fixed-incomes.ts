import express from "express";
import { requireAuth, validateBody } from "../middleware";
import {
  addFixedIncomes,
  deleteFixedIncome,
  getFixedIncomes,
  updateFixedIncome,
} from "../controllers";
import { baseEntrySchema, budgetEntrySchema } from "@moneymood-monorepo/shared";

const router = express.Router();

router.get("/", requireAuth, getFixedIncomes);
router.post("/", requireAuth, validateBody(baseEntrySchema), addFixedIncomes);
router.put(
  "/:id",
  requireAuth,
  validateBody(budgetEntrySchema),
  updateFixedIncome
);
router.delete("/:id", requireAuth, deleteFixedIncome);

export default router;
