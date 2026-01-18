import { Router } from "express";

import arcRoutes from "./arc.routes.ts";
import itemsRoutes from "./items.routes.ts";
import questRoutes from "./quests.routes.ts";

const router = Router();

router.use("/items", itemsRoutes);
router.use("/arc", arcRoutes);
router.use("/quests", questRoutes);

export default router;