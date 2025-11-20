import express from "express";
import { requireAuth, validateBody } from "../middleware";
import {
  addFixedIncomes,
  deleteFixedIncome,
  getFixedIncomes,
  updateFixedIncome,
} from "../controllers";
import { baseEntryServerSchema } from "@moneymood-monorepo/shared";

const router = express.Router();

router.get("/", requireAuth, getFixedIncomes);
router.post(
  "/",
  requireAuth,
  validateBody(baseEntryServerSchema),
  addFixedIncomes
);
router.put(
  "/:id",
  requireAuth,
  validateBody(baseEntryServerSchema),
  updateFixedIncome
);
router.delete("/:id", requireAuth, deleteFixedIncome);

export default router;
