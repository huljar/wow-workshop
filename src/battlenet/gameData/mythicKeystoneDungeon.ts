import { ApiResponse, Key, ShortEntry, generateRequestUrl, callApi, format } from "../utils";

const MYTHIC_KEYSTONE_DUNGEONS_INDEX_PATH = "/data/wow/mythic-keystone/dungeon/index";
const MYTHIC_KEYSTONE_DUNGEON_PATH = "/data/wow/mythic-keystone/dungeon/{dungeonId}";
const MYTHIC_KEYSTONE_INDEX_PATH = "/data/wow/mythic-keystone/index";
const MYTHIC_KEYSTONE_PERIODS_INDEX_PATH = "/data/wow/mythic-keystone/period/index";
const MYTHIC_KEYSTONE_PERIOD_PATH = "/data/wow/mythic-keystone/period/{periodId} ";
const MYTHIC_KEYSTONE_SEASONS_INDEX_PATH = "/data/wow/mythic-keystone/season/index";
const MYTHIC_KEYSTONE_SEASON_PATH = "/data/wow/mythic-keystone/season/{seasonId}";

interface PeriodShort {
    key: Key;
    id: number;
}

interface SeasonShort {
    key: Key;
    id: number;
}

/**
 * Interface for API call: Game Data → Mythic Keystone Dungeon → Mythic Keystone Dungeons Index
 */
export interface MythicKeystoneDungeonsIndex extends ApiResponse {
    dungeons: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Mythic Keystone Dungeon → Mythic Keystone Dungeon
 */
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

/**
 * Interface for API call: Game Data → Mythic Keystone Dungeon → Mythic Keystone Index
 */
export interface MythicKeystoneIndex extends ApiResponse {
    seasons: Key;
    dungeons: Key;
}

/**
 * Interface for API call: Game Data → Mythic Keystone Dungeon → Mythic Keystone Periods Index
 */
export interface MythicKeystonePeriodsIndex extends ApiResponse {
    periods: PeriodShort[];
    current_period: PeriodShort;
}

/**
 * Interface for API call: Game Data → Mythic Keystone Dungeon → Mythic Keystone Period
 */
export interface MythicKeystonePeriod extends ApiResponse {
    id: number;
    start_timestamp: number;
    end_timestamp: number;
}

/**
 * Interface for API call: Game Data → Mythic Keystone Dungeon → Mythic Keystone Seasons Index
 */
export interface MythicKeystoneSeasonsIndex extends ApiResponse {
    seasons: SeasonShort[];
    current_season: SeasonShort;
}

/**
 * Interface for API call: Game Data → Mythic Keystone Dungeon → Mythic Keystone Season
 */
export interface MythicKeystoneSeason extends ApiResponse {
    id: number;
    start_timestamp: number;
    end_timestamp: number;
    periods: PeriodShort[];
}

/**
 * Fetches an index of mythic keystone dungeons.
 *
 * @return  Promise that resolves to the dungeon index
 */
export async function fetchMythicKeystoneDungeonsIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_DUNGEONS_INDEX_PATH, "dynamic");
    return callApi<MythicKeystoneDungeonsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a mythic keystone dungeon.
 *
 * @param  dungeonId  The dungeon identifier
 * @return  Promise that resolves to the dungeon information
 */
export async function fetchMythicKeystoneDungeon(dungeonId: number) {
    const requestUrl = await generateRequestUrl(format(MYTHIC_KEYSTONE_DUNGEON_PATH, { dungeonId }), "dynamic");
    return callApi<MythicKeystoneDungeon>(requestUrl);
}

/**
 * Fetches an index of mythic keystone related entities.
 *
 * @return  Promise that resolves to the related entities index
 */
export async function fetchMythicKeystoneIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_INDEX_PATH, "dynamic");
    return callApi<MythicKeystoneIndex>(requestUrl);
}

/**
 * Fetches an index of mythic keystone periods.
 *
 * @return  Promise that resolves to the periods index
 */
export async function fetchMythicKeystonePeriodsIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_PERIODS_INDEX_PATH, "dynamic");
    return callApi<MythicKeystonePeriodsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a mythic keystone period.
 *
 * @param  periodId  The period identifier
 * @return  Promise that resolves to the period information
 */
export async function fetchMythicKeystonePeriod(periodId: number) {
    const requestUrl = await generateRequestUrl(format(MYTHIC_KEYSTONE_PERIOD_PATH, { periodId }), "dynamic");
    return callApi<MythicKeystonePeriod>(requestUrl);
}

/**
 * Fetches an index of mythic keystone seasons.
 *
 * @return  Promise that resolves to the seasons index
 */
export async function fetchMythicKeystoneSeasonsIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_SEASONS_INDEX_PATH, "dynamic");
    return callApi<MythicKeystoneSeasonsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a mythic keystone season.
 *
 * @param  seasonId  The season identifier
 * @return  Promise that resolves to the season information
 */
export async function fetchMythicKeystoneSeason(seasonId: number) {
    const requestUrl = await generateRequestUrl(format(MYTHIC_KEYSTONE_SEASON_PATH, { seasonId }), "dynamic");
    return callApi<MythicKeystoneSeason>(requestUrl);
}
