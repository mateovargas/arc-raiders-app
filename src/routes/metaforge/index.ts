import { Router } from "express";

import eventRoutes from "./events.routes.ts";
import mapRoutes from "./maps.routes.ts";
import traderRoutes from "./traders.routes.ts";

const router = Router();

router.use("/events-schedule", eventRoutes);
router.use("/maps", mapRoutes);
router.use("/traders", traderRoutes);

export default router;