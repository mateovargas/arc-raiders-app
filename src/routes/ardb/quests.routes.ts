import { Router } from "express";
import { getAllQuests, getQuestById } from "../../api/ardb/ardbQuestClient.ts";
import { Quest } from "../../api/types.ts";

const router = Router();

//GET /api/ardb/quests
router.get("/", async (req, res) => {
    try {
        const quests: Array<Quest> = await getAllQuests();
        res.json(quests);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch ARDB quests data" });
    }
})

//GET /api/ardb/quests/:id
router.get("/:id", async (req, res) => {
    try {
        const quest: Quest = await getQuestById(req.params.id);
        res.json(quest);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch ARDB quest data" });
    }
});

export default router;