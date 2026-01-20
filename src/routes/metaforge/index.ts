import { Router } from "express";

import eventRoutes from "./events.routes.js";
import mapRoutes from "./maps.routes.js";
import traderRoutes from "./traders.routes.js";

const router = Router();

router.use("/events-schedule", eventRoutes);
router.use("/maps", mapRoutes);
router.use("/traders", traderRoutes);

export default router;