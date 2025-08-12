import express from "express";
import { budgetEntrySchema, createBudgetEntrySchema } from "shared";
import { requireAuth, validateBody } from "../middleware";
import {
  addFixedCharges,
  deleteFixedCharge,
  getFixedCharges,
  updateFixedCharge,
} from "../controllers";

const router = express.Router();

router.get("/", requireAuth, getFixedCharges);
router.post(
  "/",
  requireAuth,
  validateBody(createBudgetEntrySchema),
  addFixedCharges
);
router.put(
  "/:id",
  requireAuth,
  validateBody(budgetEntrySchema),
  updateFixedCharge
);
router.delete("/:id", requireAuth, deleteFixedCharge);

export default router;
