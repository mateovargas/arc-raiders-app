import { Item } from "../types.ts";
import getClient from "../getClient.ts";
import { API_BASE_URL } from "./const.ts";

export const getAllItems = async () => {
    return getClient("items", API_BASE_URL);
}

export const getItemById = async (itemId: string) => {
    if (!itemId) {
        throw new Error("itemId is required");
    }

    return getClient(`items/${itemId}`, API_BASE_URL);
}

export const findItemsByNameContains = async (query: string) => {
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