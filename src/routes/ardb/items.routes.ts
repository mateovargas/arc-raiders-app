import { Router } from "express";

import { getAllItems, getItemById } from "../../api/ardb/ardbItemClient.js";
import { Item } from "../../api/types.js";
import { getOrFetch, makeCacheKey } from "../../cache/lru.js";

const router = Router();

// GET /api/ardb/items
router.get("/", async (req, res) => {
    const key = makeCacheKey({ route: "ardb:items:list" });

    try {
        const result = await getOrFetch<Array<Item>>(key, () => getAllItems());
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");
        return res.json(result.data);
    } catch (err) {
        return res.status(502).json({ error: "Failed to fetch ARDB items" });
    }
});

// GET /api/ardb/items/:id
router.get("/:id", async (req, res) => {
    const id = String(req.params.id || "").trim();
    if (!id) return res.status(400).json({ error: "Missing item id" });

    const key = makeCacheKey({ route: "ardb:items:byId", id });

    try {
        const result = await getOrFetch<Item>(key, () => getItemById(id));
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");
        return res.json(result.data);
    } catch (err) {
        return res.status(502).json({ error: "Failed to fetch ARDB item" });
    }
});

export default router;
