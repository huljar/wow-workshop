import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const MYTHIC_RAID_LEADERBOARD_PATH = "/data/wow/leaderboard/hall-of-fame/{raid}/{faction}";

/**
 * Interface for API call: Game Data → Mythic Raid Leaderboard → Mythic Raid Leaderboard
 */
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

/**
 * Fetches the mythic raid leaderboard for a given raid and faction.
 *
 * @param  raid     The name of the raid
 * @param  faction  The faction (alliance or horde)
 * @return  Promise that resolves to the raid leaderboard
 */
export async function fetchMythicRaidLeaderboard(raid: string, faction: "alliance" | "horde") {
    const requestUrl = await generateRequestUrl(format(MYTHIC_RAID_LEADERBOARD_PATH, { raid, faction }), "dynamic");
    return callApi<MythicRaidLeaderboard>(requestUrl);
}
