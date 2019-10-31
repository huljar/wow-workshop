import { ApiResponse, Key, ShortEntry, generateRequestUrl, callApi, format } from "../utils";

const PVP_TIERS_INDEX_PATH = "/data/wow/pvp-tier/{pvpTierId}";
const PVP_TIER_PATH = "/data/wow/pvp-tier/index";
const PVP_TIER_MEDIA_PATH = "/data/wow/media/pvp-tier/{pvpTierId}";

/**
 * Interface for API call: Game Data → PvP Tier → PvP Tiers Index
 */
export interface PvPTiersIndex extends ApiResponse {
    tiers: ShortEntry[];
}

/**
 * Interface for API call: Game Data → PvP Tier → PvP Tier
 */
export interface PvPTier extends ApiResponse {
    id: number;
    name: string;
    min_rating: number;
    max_rating: number;
    media: {
        key: Key;
    };
    bracket: {
        id: number;
        type: string;
    };
    rating_type: number;
}

/**
 * Interface for API call: Game Data → PvP Tier → PvP Tier Media
 */
export interface PvPTierMedia extends ApiResponse {
    assets: {
        key: string;
        value: string;
    }[];
}

/**
 * Fetches an index of PvP tiers.
 *
 * @return  Promise that resolves to the PvP tiers index
 */
export async function fetchPvPTiersIndex() {
    const requestUrl = await generateRequestUrl(PVP_TIERS_INDEX_PATH, "static");
    return callApi<PvPTiersIndex>(requestUrl);
}

/**
 * Fetches detailed information about a PvP tier.
 *
 * @param  pvpTierId  The PvP tier identifier
 * @return  Promise that resolves to the PvP tier information
 */
export async function fetchPvPTier(pvpTierId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_TIER_PATH, { pvpTierId }), "static");
    return callApi<PvPTier>(requestUrl);
}

/**
 * Fetches media corresponding to the given PvP tier.
 *
 * @param  pvpTierId  The PvP tier identifier
 * @return  Promise that resolves to the PvP tier media
 */
export async function fetchPvPTierMedia(pvpTierId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_TIER_MEDIA_PATH, { pvpTierId }), "static");
    return callApi<PvPTierMedia>(requestUrl);
}
