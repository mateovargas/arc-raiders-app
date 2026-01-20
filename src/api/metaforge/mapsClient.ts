import getClient from "../getClient.js";
import { API_BASE_URL_MAPS } from "./const.js";


//https://metaforge.app/api/game-map-data?tableID=arc_map_data&mapID=dam
export const getMapData = async (mapName: string) => {
    return getClient(`game-map-data?tableID=arc_map_data&mapID=${mapName}`, API_BASE_URL_MAPS);
}