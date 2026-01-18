import getClient from "../getClient.ts";
import { API_BASE_URL } from "./const.ts";

export const getAllTraders = async () => {
    return getClient("traders", API_BASE_URL);
}