import { Router } from "express";
import { getAllItems, getItemById } from "../../api/ardbItemClient.ts";
import { Item } from "../../api/types.ts";

const router = Router();

// GET /api/ardb/items
router.get("/", async (req, res) => {
    try {
        const items: Array<Item> = await getAllItems();
        res.json(items);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch ARDB items" });
    }
});

// GET /api/ardb/items/:id
router.get("/:id", async (req, res) => {
    try {
        const item: Item = await getItemById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(502).json({ error: "Failed to fetch ARDB item" });
    }
});

export default router;
