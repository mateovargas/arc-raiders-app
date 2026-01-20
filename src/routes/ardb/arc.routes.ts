import { Router } from "express";

import { getAllArc, getArcById } from "../../api/ardb/ardbArcClient.js";
import { Arc } from "../../api/types.js";
import { getOrFetch, makeCacheKey } from "../../cache/lru.js";

const router = Router();

// GET /api/ardb/arc
router.get("/", async (req, res) => {
    const key = makeCacheKey({ route: "ardb:arc:list" });

    try {
        const result = await getOrFetch<Array<Arc>>(key, () => getAllArc());

        // Optional but helpful for debugging in browser or Cypress
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");

        return res.json(result.data);
    } catch (err) {
        return res.status(502).json({ error: "Failed to fetch ARDB arc data" });
    }
});

// GET /api/ardb/arc/:id
router.get("/:id", async (req, res) => {
    const id = String(req.params.id || "").trim();
    if (!id) return res.status(400).json({ error: "Missing arc id" });

    const key = makeCacheKey({ route: "ardb:arc:byId", id });

    try {
        const result = await getOrFetch<Arc>(key, () => getArcById(id));

        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");

        return res.json(result.data);
    } catch (err) {
        return res.status(502).json({ error: "Failed to fetch ARDB arc data" });
    }
});

export default router;