import getClient from "../getClient.js";
import { API_BASE_URL } from "./const.js";

export const getAllTraders = async () => {
    return getClient("traders", API_BASE_URL);
}