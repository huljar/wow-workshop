import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const MYTHIC_KEYSTONE_DUNGEONS_INDEX_PATH = "/data/wow/mythic-keystone/dungeon/index";
const MYTHIC_KEYSTONE_DUNGEON_PATH = "/data/wow/mythic-keystone/dungeon/{dungeonId}";
const MYTHIC_KEYSTONE_INDEX_PATH = "/data/wow/mythic-keystone/index";
const MYTHIC_KEYSTONE_PERIODS_INDEX_PATH = "/data/wow/mythic-keystone/period/index";
const MYTHIC_KEYSTONE_PERIOD_PATH = "/data/wow/mythic-keystone/period/{periodId} ";
const MYTHIC_KEYSTONE_SEASONS_INDEX_PATH = "/data/wow/mythic-keystone/season/index";
const MYTHIC_KEYSTONE_SEASON_PATH = "/data/wow/mythic-keystone/season/{seasonId}";

interface DungeonShort {
    key: Key;
    name: string;
    id: number;
}

interface PeriodShort {
    key: Key;
    id: number;
}

interface SeasonShort {
    key: Key;
    id: number;
}

export interface MythicKeystoneDungeonsIndex extends ApiResponse {
    dungeons: DungeonShort[];
}

export interface MythicKeystoneDungeon extends ApiResponse {
    id: number;
    name: string;
    map: {
        name: string;
        id: number;
    };
    zone: {
        slug: string;
    };
    keystone_upgrades: {
        upgrade_level: number;
        qualifying_duration: number;
    }[];
}

export interface MythicKeystoneIndex extends ApiResponse {
    seasons: Key;
    dungeons: Key;
}

export interface MythicKeystonePeriodsIndex extends ApiResponse {
    periods: PeriodShort[];
    current_period: PeriodShort;
}

export interface MythicKeystonePeriod extends ApiResponse {
    id: number;
    start_timestamp: number;
    end_timestamp: number;
}

export interface MythicKeystoneSeasonsIndex extends ApiResponse {
    seasons: SeasonShort[];
    current_season: SeasonShort;
}

export interface MythicKeystoneSeason extends ApiResponse {
    id: number;
    start_timestamp: number;
    end_timestamp: number;
    periods: PeriodShort[];
}

export async function fetchMythicKeystoneDungeonsIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_DUNGEONS_INDEX_PATH, "dynamic");
    return callApi<MythicKeystoneDungeonsIndex>(requestUrl);
}

export async function fetchMythicKeystoneDungeon(dungeonId: number) {
    const requestUrl = await generateRequestUrl(format(MYTHIC_KEYSTONE_DUNGEON_PATH, { dungeonId }), "dynamic");
    return callApi<MythicKeystoneDungeon>(requestUrl);
}

export async function fetchMythicKeystoneIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_INDEX_PATH, "dynamic");
    return callApi<MythicKeystoneIndex>(requestUrl);
}

export async function fetchMythicKeystonePeriodsIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_PERIODS_INDEX_PATH, "dynamic");
    return callApi<MythicKeystonePeriodsIndex>(requestUrl);
}

export async function fetchMythicKeystonePeriod(periodId: number) {
    const requestUrl = await generateRequestUrl(format(MYTHIC_KEYSTONE_PERIOD_PATH, { periodId }), "dynamic");
    return callApi<MythicKeystonePeriod>(requestUrl);
}

export async function fetchMythicKeystoneSeasonsIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_SEASONS_INDEX_PATH, "dynamic");
    return callApi<MythicKeystoneSeasonsIndex>(requestUrl);
}

export async function fetchMythicKeystoneSeason(seasonId: number) {
    const requestUrl = await generateRequestUrl(format(MYTHIC_KEYSTONE_SEASON_PATH, { seasonId }), "dynamic");
    return callApi<MythicKeystoneSeason>(requestUrl);
}
