import getClient from "../getClient.ts";
import { Quest } from "../types.ts";
import { API_BASE_URL } from "./const.ts";

export const getAllQuests = async () => {
    return getClient("quests", API_BASE_URL);
}

export const getQuestById = async (questId: string) => {
    if (!questId) {
        throw new Error("questId is required");
    }

    return getClient(`quests/${questId}`, API_BASE_URL);
}

export const findQuestsByNameContains = async (query: string) => {
    const normalizedQuery = String(query || "").trim().toLowerCase();
    if (!normalizedQuery) {
        return [];
    }

    const quests = await getAllQuests();
    return quests.filter((quest: Quest) => {
        const name = String(quest?.title || "").toLowerCase();
        return name.includes(normalizedQuery);
    });
}