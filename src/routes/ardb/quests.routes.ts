import { Router } from "express";

import { getAllQuests, getQuestById } from "../../api/ardb/ardbQuestClient.js";
import { Quest } from "../../api/types.js";
import { getOrFetch, makeCacheKey } from "../../cache/lru.js";

const router = Router();

// GET /api/ardb/quests
router.get("/", async (req, res) => {
    const key = makeCacheKey({ route: "ardb:quests:list" });

    try {
        const result = await getOrFetch<Array<Quest>>(key, () => getAllQuests());
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");
        return res.json(result.data);
    } catch (err) {
        return res.status(502).json({ error: "Failed to fetch ARDB quests data" });
    }
});

// GET /api/ardb/quests/:id
router.get("/:id", async (req, res) => {
    const id = String(req.params.id || "").trim();
    if (!id) return res.status(400).json({ error: "Missing quest id" });

    const key = makeCacheKey({ route: "ardb:quests:byId", id });

    try {
        const result = await getOrFetch<Quest>(key, () => getQuestById(id));
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");
        return res.json(result.data);
    } catch (err) {
        return res.status(502).json({ error: "Failed to fetch ARDB quest data" });
    }
});

export default router;
