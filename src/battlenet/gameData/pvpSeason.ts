import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";

const PVP_SEASONS_INDEX_PATH = "/data/wow/pvp-season/index";
const PVP_SEASON_PATH = "/data/wow/pvp-season/{pvpSeasonId}";
const PVP_LEADERBOARDS_INDEX_PATH = "/data/wow/pvp-season/{pvpSeasonId}/pvp-leaderboard/index";
const PVP_LEADERBOARD_PATH = "/data/wow/pvp-season/{pvpSeasonId}/pvp-leaderboard/{pvpBracket}";
const PVP_REWARDS_INDEX_PATH = "/data/wow/pvp-season/{pvpSeasonId}/pvp-reward/index";

interface PvPSeasonShort {
    key: Key;
    id: number;
}

/**
 * Interface for API call: Game Data → PvP Season → PvP Seasons Index
 */
export interface PvPSeasonsIndex extends ApiResponse {
    seasons: PvPSeasonShort[];
}

/**
 * Interface for API call: Game Data → PvP Season → PvP Season
 */
export interface PvPSeason extends ApiResponse {
    id: number;
    leaderboards: Key;
    rewards: Key;
    season_start_timestamp: number;
    season_end_timestamp: number;
}

/**
 * Interface for API call: Game Data → PvP Season → PvP Leaderboards Index
 */
export interface PvPLeaderboardsIndex extends ApiResponse {
    season: PvPSeasonShort;
    leaderboards: ShortEntry[];
}

/**
 * Interface for API call: Game Data → PvP Season → PvP Leaderboard
 */
export interface PvPLeaderboard extends ApiResponse {
    season: PvPSeasonShort;
    name: string;
    bracket: {
        id: number;
        type: string;
    };
    entries: {
        character: {
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
        rank: number;
        rating: number;
        season_match_statistics: {
            played: number;
            won: number;
            lost: number;
        };
        tier: {
            key: Key;
            id: number;
        };
    }[];
}

/**
 * Interface for API call: Game Data → PvP Season → PvP Rewards Index
 */
export interface PvPRewardsIndex extends ApiResponse {
    season: PvPSeasonShort;
    rewards: {
        bracket: {
            id: number;
            type: string;
        };
        achievement: ShortEntry;
        rating_cutoff: number;
        faction: TypedName;
    }[];
}

/**
 * Fetches an index of PvP seasons.
 *
 * @return  Promise that resolves to the PvP seasons index
 */
export async function fetchPvPSeasonsIndex() {
    const requestUrl = await generateRequestUrl(PVP_SEASONS_INDEX_PATH, "dynamic");
    return callApi<PvPSeasonsIndex>(requestUrl);
}
/**
 * Fetches detailed information about a PvP season.
 *
 * @param  pvpSeasonId  The PvP season identifier
 * @return  Promise that resolves to the PvP season information
 */
export async function fetchPvPSeason(pvpSeasonId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_SEASON_PATH, { pvpSeasonId }), "dynamic");
    return callApi<PvPSeason>(requestUrl);
}

/**
 * Fetches an index of PvP leaderboards.
 *
 * @param  pvpSeasonId  The PvP season identifier
 * @return  Promise that resolves to the PvP leaderboards index
 */
export async function fetchPvPLeaderboardsIndex(pvpSeasonId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_LEADERBOARDS_INDEX_PATH, { pvpSeasonId }), "dynamic");
    return callApi<PvPLeaderboardsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a PvP leaderboard.
 *
 * @param  pvpSeasonId  The PvP season identifier
 * @param  pvpBracket   The PvP bracket
 * @return  Promise that resolves to the PvP leaderboard information
 */
export async function fetchPvPLeaderboard(pvpSeasonId: number, pvpBracket: string) {
    const requestUrl = await generateRequestUrl(format(PVP_LEADERBOARD_PATH, { pvpSeasonId, pvpBracket }), "dynamic");
    return callApi<PvPLeaderboard>(requestUrl);
}

/**
 * Fetches an index of PvP rewards.
 *
 * @param  pvpSeasonId  The PvP season identifier
 * @return  Promise that resolves to the PvP rewards index
 */
export async function fetchPvPRewardsIndex(pvpSeasonId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_REWARDS_INDEX_PATH, { pvpSeasonId }), "dynamic");
    return callApi<PvPRewardsIndex>(requestUrl);
}
