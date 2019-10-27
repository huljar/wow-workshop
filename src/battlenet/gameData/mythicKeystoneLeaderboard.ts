import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";
import { MythicKeystoneAffixShort } from "./mythicKeystoneAffix";

const MYTHIC_KEYSTONE_LEADERBOARDS_INDEX_PATH = "/data/wow/connected-realm/{connectedRealmId}/mythic-leaderboard/index";
const MYTHIC_KEYSTONE_LEADERBOARD_PATH =
    "/data/wow/connected-realm/{connectedRealmId}/mythic-leaderboard/{dungeonId}/period/{period}";

interface LeaderboardShort {
    key: Key;
    name: string;
    id: number;
}

export interface MythicKeystoneLeaderboardsIndex extends ApiResponse {
    current_leaderboards: LeaderboardShort[];
}

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
        keystone_affix: MythicKeystoneAffixShort;
        starting_level: number;
    }[];
    map_challenge_mode_id: number;
    name: string;
}

export async function fetchMythicKeystoneLeaderboardsIndex(connectedRealmId: number) {
    const requestUrl = await generateRequestUrl(
        format(MYTHIC_KEYSTONE_LEADERBOARDS_INDEX_PATH, { connectedRealmId }),
        "dynamic"
    );
    return callApi<MythicKeystoneLeaderboardsIndex>(requestUrl);
}

export async function fetchMythicKeystoneLeaderboard(connectedRealmId: number, dungeonId: number, period: number) {
    const requestUrl = await generateRequestUrl(
        format(MYTHIC_KEYSTONE_LEADERBOARD_PATH, { connectedRealmId, dungeonId, period }),
        "dynamic"
    );
    return callApi<MythicKeystoneLeaderboard>(requestUrl);
}
