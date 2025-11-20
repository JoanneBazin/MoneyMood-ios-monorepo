import express from "express";
import { requireAuth, validateBody } from "../middleware";
import {
  addFixedCharges,
  deleteFixedCharge,
  getFixedCharges,
  updateFixedCharge,
} from "../controllers";
import { baseEntryServerSchema } from "@moneymood-monorepo/shared";

const router = express.Router();

router.get("/", requireAuth, getFixedCharges);
router.post(
  "/",
  requireAuth,
  validateBody(baseEntryServerSchema),
  addFixedCharges
);
router.put(
  "/:id",
  requireAuth,
  validateBody(baseEntryServerSchema),
  updateFixedCharge
);
router.delete("/:id", requireAuth, deleteFixedCharge);

export default router;
