import getClient from "../getClient.js";
import { API_BASE_URL } from "./const.js";

export const getAllEventsSchedule = async () => {
    return getClient("events-schedule", API_BASE_URL);
}