import getClient from "../getClient.ts";
import { API_BASE_URL_MAPS } from "./const.ts";


//https://metaforge.app/api/game-map-data?tableID=arc_map_data&mapID=dam
export const getMapData = async (mapName: string) => {
    return getClient(`game-map-data?tableID=arc_map_data&mapID=${mapName}`, API_BASE_URL_MAPS);
}