import { Router } from "express";

import { getAllEventsSchedule } from "../../api/metaforge/eventsClient.js";
import { ArcEvent, EventsResponse } from "../../api/types.js";
import { getOrFetch, makeCacheKey } from "../../cache/lru.js";

const router = Router();

//GET /api/metaforge/events-schedule
router.get("/", async (req, res) => {
    const key = makeCacheKey({ route: "metaforge:eventsSchedule" });

    try {
        const result = await getOrFetch<EventsResponse>(key, () => getAllEventsSchedule());
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");
        res.json(result.data);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch Metaforge events schedule data" });
    }
});

router.get("/:name", async (req, res) => {
    const key = makeCacheKey({ route: "metaforge:eventsSchedule" });

    try {
        const result = await getOrFetch<EventsResponse>(key, () => getAllEventsSchedule());
        res.setHeader("XCache", result.cacheHit ? "HIT" : "MISS");

        const eventsSchedule: EventsResponse = result.data;
        const nameParam = req.params.name.replace("-", " ");
        const event: ArcEvent | undefined = eventsSchedule.data.find(
            (event => event.name.toLowerCase() === nameParam.toLowerCase())
        );

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(event);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch Metaforge events schedule data" });
    }
});

export default router;