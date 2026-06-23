import express from "express";
import {
  cleanStagingDb,
  seedTestBudgetData,
  seedTestProjectData,
  seedUserB,
} from "src/controllers";
import { protectTestRoutes, requireAuth } from "src/middleware";

const router = express.Router();

router.use(protectTestRoutes);

router.post("/seed-user", seedUserB);
router.post("/seed-project", requireAuth, seedTestProjectData);
router.delete("/clean-users", cleanStagingDb);
router.post("/seed-budget-data", seedTestBudgetData);

export default router;
