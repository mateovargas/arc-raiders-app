import { Router } from "express";

import arcRoutes from "./arc.routes.ts";
import itemsRoutes from "./items.routes.ts";


const router = Router();

router.use("/items", itemsRoutes);
router.use("/arc", arcRoutes);

export default router;