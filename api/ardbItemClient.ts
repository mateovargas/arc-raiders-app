import ardbGet from "./ardbClient.ts"
import { Item } from "./types.ts";

const getAllItems = async () => {
    return ardbGet("items");
}

const getItemById = async (itemId: string) => {
    if (!itemId) {
        throw new Error("itemId is required");
    }

    return ardbGet(`items/${itemId}`);
}

const findItemsByNameContains = async (query: string) => {
    const normalizedQuery = String(query || "").trim().toLowerCase();
    if (!normalizedQuery) {
        return [];
    }

    const items = await getAllItems();
    return items.filter((item: Item) => {
        const name = String(item?.name || "").toLowerCase();
        return name.includes(normalizedQuery);
    });
}

export {
    getAllItems,
    getItemById,
    findItemsByNameContains
};