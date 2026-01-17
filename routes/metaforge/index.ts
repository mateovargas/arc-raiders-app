import { Router } from "express";

import eventRoutes from "./events.routes.ts";
import traderRoutes from "./traders.routes.ts";

const router = Router();

router.use("/traders", traderRoutes);
router.use("/events-schedule", eventRoutes);

export default router;