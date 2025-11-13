import express from "express";
import { requireAuth, validateBody } from "../middleware";
import { getSession, login, logout, signup } from "../controllers";
import { loginSchema, signupSchema } from "@moneymood-monorepo/shared";

const router = express.Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.get("/session", requireAuth, getSession);
router.post("/logout", requireAuth, logout);

export default router;
