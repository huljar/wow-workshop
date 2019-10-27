import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";
import { AchievementShort } from "./achievement";

const PVP_SEASONS_INDEX_PATH = "/data/wow/pvp-season/index";
const PVP_SEASON_PATH = "/data/wow/pvp-season/{pvpSeasonId}";
const PVP_LEADERBOARDS_INDEX_PATH = "/data/wow/pvp-season/{pvpSeasonId}/pvp-leaderboard/index";
const PVP_LEADERBOARD_PATH = "/data/wow/pvp-season/{pvpSeasonId}/pvp-leaderboard/{pvpBracket}";
const PVP_REWARDS_INDEX_PATH = "/data/wow/pvp-season/{pvpSeasonId}/pvp-reward/index";

interface PvPSeasonShort {
    key: Key;
    id: number;
}

interface PvPLeaderboardShort {
    key: Key;
    name: string;
    id: number;
}

export interface PvPSeasonsIndex extends ApiResponse {
    seasons: PvPSeasonShort[];
}

export interface PvPSeason extends ApiResponse {
    id: number;
    leaderboards: Key;
    rewards: Key;
    season_start_timestamp: number;
    season_end_timestamp: number;
}

export interface PvPLeaderboardsIndex extends ApiResponse {
    season: PvPSeasonShort;
    leaderboards: PvPLeaderboardShort[];
}

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

export interface PvPRewardsIndex extends ApiResponse {
    season: PvPSeasonShort;
    rewards: {
        bracket: {
            id: number;
            type: string;
        };
        achievement: AchievementShort;
        rating_cutoff: number;
        faction: {
            type: string;
            name: string;
        };
    }[];
}

export async function fetchPvPSeasonsIndex() {
    const requestUrl = await generateRequestUrl(PVP_SEASONS_INDEX_PATH, "dynamic");
    return callApi<PvPSeasonsIndex>(requestUrl);
}

export async function fetchPvPSeason(pvpSeasonId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_SEASON_PATH, { pvpSeasonId }), "dynamic");
    return callApi<PvPSeason>(requestUrl);
}

export async function fetchPvPLeaderboardsIndex(pvpSeasonId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_LEADERBOARDS_INDEX_PATH, { pvpSeasonId }), "dynamic");
    return callApi<PvPLeaderboardsIndex>(requestUrl);
}

export async function fetchPvPLeaderboard(pvpSeasonId: number, pvpBracket: string) {
    const requestUrl = await generateRequestUrl(format(PVP_LEADERBOARD_PATH, { pvpSeasonId, pvpBracket }), "dynamic");
    return callApi<PvPLeaderboard>(requestUrl);
}

export async function fetchPvPRewardsIndex(pvpSeasonId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_REWARDS_INDEX_PATH, { pvpSeasonId }), "dynamic");
    return callApi<PvPRewardsIndex>(requestUrl);
}
