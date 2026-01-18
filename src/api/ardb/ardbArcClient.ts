import getClient from "../getClient.ts";
import { Arc } from "../types.ts";
import { API_BASE_URL } from "./const.ts";

export const getAllArc = async () => {
    return getClient("arc-enemies", API_BASE_URL);
}

export const getArcById = async (arcId: string) => {
    if (!arcId) {
        throw new Error("arcId is required");
    }
    return getClient(`arc-enemies/${arcId}`, API_BASE_URL);
}

export const findArcByNameContains = async (query: string) => {
    const normalizedQuery = String(query || "").trim().toLowerCase();
    if (!normalizedQuery) {
        return [];
    }

    const arc: Array<Arc> = await getAllArc();
    return arc.filter((arcItem: Arc) => {
        const name = String(arcItem?.name || "").toLowerCase();
        return name.includes(normalizedQuery);
    });
}