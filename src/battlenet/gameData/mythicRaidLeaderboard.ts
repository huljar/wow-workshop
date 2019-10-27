import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const MYTHIC_RAID_LEADERBOARD_PATH = "/data/wow/leaderboard/hall-of-fame/{raid}/{faction}";

export interface MythicRaidLeaderboard extends ApiResponse {
    slug: string;
    criteria_type: string;
    zone: {
        key: Key;
        name: string;
    };
    entries: {
        guild: {
            name: string;
            id: number;
            realm: {
                name: string;
                id: number;
                slug: string;
            };
        };
        faction: {
            type: string;
        };
        timestamp: number;
        region: string;
        rank: number;
    }[];
}

export async function fetchMythicRaidLeaderboard(raid: string, faction: "alliance" | "horde") {
    const requestUrl = await generateRequestUrl(format(MYTHIC_RAID_LEADERBOARD_PATH, { raid, faction }), "dynamic");
    return callApi<MythicRaidLeaderboard>(requestUrl);
}
