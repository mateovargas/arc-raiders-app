import { Router } from "express";
import { getAllArc, getArcById } from "../../api/ardbArcClient.ts";
import { Arc } from "../../api/types.ts";

const router = Router();

//GET /api/ardb/arc
router.get("/", async (req, res) => {
    try {
        const arc: Array<Arc> = await getAllArc();
        res.json(arc);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch ARDB arc data" });
    }
})

//GET /api/ardb/arc/:id
router.get("/:id", async (req, res) => {
    try {
        const arc: Arc = await getArcById(req.params.id);
        res.json(arc);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch ARDB arc data" });
    }
});

export default router;