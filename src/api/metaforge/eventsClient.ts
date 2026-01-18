import getClient from "../getClient.ts";
import { API_BASE_URL } from "./const.ts";

export const getAllEventsSchedule = async () => {
    return getClient("events-schedule", API_BASE_URL);
}