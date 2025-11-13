import express from "express";
import { requireAuth, validateBody } from "../middleware";
import {
  addFixedCharges,
  deleteFixedCharge,
  getFixedCharges,
  updateFixedCharge,
} from "../controllers";
import { baseEntrySchema, budgetEntrySchema } from "@moneymood-monorepo/shared";

const router = express.Router();

router.get("/", requireAuth, getFixedCharges);
router.post("/", requireAuth, validateBody(baseEntrySchema), addFixedCharges);
router.put(
  "/:id",
  requireAuth,
  validateBody(budgetEntrySchema),
  updateFixedCharge
);
router.delete("/:id", requireAuth, deleteFixedCharge);

export default router;
