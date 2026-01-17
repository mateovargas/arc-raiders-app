import ardbGet from "./ardbClient.ts"
import { Arc } from "./types.ts";

const getAllArc = async () => {
    return ardbGet("arc-enemies");
}

const getArcById = async (arcId: string) => {
    if (!arcId) {
        throw new Error("arcId is required");
    }

    return ardbGet(`arc-enemies/${arcId}`);
}

const findArcByNameContains = async (query: string) => {
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

export {
    getAllArc,
    getArcById,
    findArcByNameContains
};