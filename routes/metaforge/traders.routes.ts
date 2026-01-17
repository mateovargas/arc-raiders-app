import { Router } from "express";
import { getAllTraders } from "../../api/metaforge/tradersClient.ts";
import { TraderCatalogResponse, TraderItem } from "../../api/types.ts";

const router = Router();

//GET /api/metaforge/traders
router.get("/", async (req, res) => {
    try {
        const traders: TraderCatalogResponse = await getAllTraders();
        res.json(traders);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch Metaforge trader data" });
    }
});

//GET /api/metaforge/traders/:name
router.get("/:name", async (req, res) => {
    try {
        const traders: TraderCatalogResponse = await getAllTraders();
        const trader: Array<TraderItem> = traders.data[req.params.name];
        if (!trader) {
            return res.status(404).json({ error: "Trader not found" });
        }
        res.json(trader);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch Metaforge trader data" });
    }
});

export default router;