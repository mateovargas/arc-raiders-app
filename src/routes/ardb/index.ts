import { Router } from "express";

import arcRoutes from "./arc.routes.js";
import itemsRoutes from "./items.routes.js";
import questRoutes from "./quests.routes.js";

const router = Router();

router.use("/arc", arcRoutes);
router.use("/items", itemsRoutes);
router.use("/quests", questRoutes);

export default router;