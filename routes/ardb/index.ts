import { Router } from "express";
import itemsRoutes from "./items.routes.ts";

const router = Router();

router.use("/items", itemsRoutes);

export default router;