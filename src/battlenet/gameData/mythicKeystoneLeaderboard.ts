import { ApiResponse, Key, ShortEntry, generateRequestUrl, callApi, format } from "../utils";

const MYTHIC_KEYSTONE_LEADERBOARDS_INDEX_PATH = "/data/wow/connected-realm/{connectedRealmId}/mythic-leaderboard/index";
const MYTHIC_KEYSTONE_LEADERBOARD_PATH =
    "/data/wow/connected-realm/{connectedRealmId}/mythic-leaderboard/{dungeonId}/period/{period}";

/**
 * Interface for API call: Game Data → Mythic Keystone Leaderboard → Mythic Keystone Leaderboards Index
 */
export interface MythicKeystoneLeaderboardsIndex extends ApiResponse {
    current_leaderboards: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Mythic Keystone Leaderboard → Mythic Keystone Leaderboard
 */
export interface MythicKeystoneLeaderboard extends ApiResponse {
    map: {
        name: string;
        id: number;
    };
    period: number;
    period_start_timestamp: number;
    period_end_timestamp: number;
    connected_realm: Key;
    leading_groups: {
        ranking: number;
        duration: number;
        completed_timestamp: number;
        keystone_level: number;
        members: {
            profile: {
                name: string;
                id: number;
                realm: {
                    key: Key;
                    id: number;
                    slug: string;
                };
            };
            faction: {
                type: string;
            };
            specialization: {
                key: Key;
                id: number;
            };
        }[];
    }[];
    keystone_affixes: {
        keystone_affix: ShortEntry;
        starting_level: number;
    }[];
    map_challenge_mode_id: number;
    name: string;
}

/**
 * Fetches an index of mythic keystone leaderboards.
 *
 * @param  connectedRealmId  The ID of the connected realm to fetch the leaderboards for
 * @return  Promise that resolves to the leaderboards index
 */
export async function fetchMythicKeystoneLeaderboardsIndex(connectedRealmId: number) {
    const requestUrl = await generateRequestUrl(
        format(MYTHIC_KEYSTONE_LEADERBOARDS_INDEX_PATH, { connectedRealmId }),
        "dynamic"
    );
    return callApi<MythicKeystoneLeaderboardsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a mythic keystone leaderboard.
 *
 * @param  connectedRealmId  The connected realm identifier
 * @param  dungeonId         The dungeon identifier
 * @param  period            The period
 * @return  Promise that resolves to the leaderboard information
 */
export async function fetchMythicKeystoneLeaderboard(connectedRealmId: number, dungeonId: number, period: number) {
    const requestUrl = await generateRequestUrl(
        format(MYTHIC_KEYSTONE_LEADERBOARD_PATH, { connectedRealmId, dungeonId, period }),
        "dynamic"
    );
    return callApi<MythicKeystoneLeaderboard>(requestUrl);
}
