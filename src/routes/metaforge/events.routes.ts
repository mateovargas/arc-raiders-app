import { Router } from "express";
import { getAllEventsSchedule } from "../../api/metaforge/eventsClient.ts";
import { ArcEvent, EventsResponse } from "../../api/types.ts";

const router = Router();

//GET /api/metaforge/events-schedule
router.get("/", async (req, res) => {
    try {
        const eventsSchedule: EventsResponse = await getAllEventsSchedule();
        res.json(eventsSchedule);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch Metaforge events schedule data" });
    }
});

router.get("/:name", async (req, res) => {
    try {
        const eventsSchedule: EventsResponse = await getAllEventsSchedule();
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