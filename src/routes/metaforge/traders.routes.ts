import { Router } from "express";

import { getAllTraders } from "../../api/metaforge/tradersClient.ts";
import { TraderCatalogResponse, TraderItem } from "../../api/types.ts";
import { getOrFetch, makeCacheKey } from "../../cache/lru.ts";

const router = Router();

//GET /api/metaforge/traders
router.get("/", async (req, res) => {
    const key = makeCacheKey({ route: "metaforge:traders" });

    try {
        const result = await getOrFetch<TraderCatalogResponse>(key, () => getAllTraders());
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");
        res.json(result.data);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch Metaforge trader data" });
    }
});

//GET /api/metaforge/traders/:name
router.get("/:name", async (req, res) => {
    const key = makeCacheKey({ route: "metaforge:traders" });

    try {
        const result = await getOrFetch<TraderCatalogResponse>(key, () => getAllTraders());
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");

        const traders: TraderCatalogResponse = result.data;
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