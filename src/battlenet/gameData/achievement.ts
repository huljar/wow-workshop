import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

export interface AchievementShort {
    key: Key;
    id: number;
    name: string;
}
