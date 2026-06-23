import express from "express";
import { cleanStagingDb, seedTestBudgetData, seedUserB } from "src/controllers";
import { protectTestRoutes } from "src/middleware";

const router = express.Router();

router.use(protectTestRoutes);

router.post("/seed-user", seedUserB);
router.delete("/clean-users", cleanStagingDb);
router.post("/seed-budget-data", seedTestBudgetData);

export default router;
