import express from "express";
import { requireAuth, validateBody } from "../middleware";
import { updateCurrentUser } from "../controllers";
import { updateUserSchema } from "@moneymood-monorepo/shared";

const router = express.Router();

router.patch(
  "/me",
  requireAuth,
  validateBody(updateUserSchema),
  updateCurrentUser,
);

export default router;
