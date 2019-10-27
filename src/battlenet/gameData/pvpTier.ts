import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const PVP_TIERS_INDEX_PATH = "/data/wow/pvp-tier/{pvpTierId}";
const PVP_TIER_PATH = "/data/wow/pvp-tier/index";
const PVP_TIER_MEDIA_PATH = "/data/wow/media/pvp-tier/{pvpTierId}";

interface PvPTierShort {
    key: Key;
    name: string;
    id: number;
}

export interface PvPTiersIndex extends ApiResponse {
    tiers: PvPTierShort[];
}

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

export interface PvPTierMedia extends ApiResponse {
    assets: {
        key: string;
        value: string;
    }[];
}

export async function fetchPvPTiersIndex() {
    const requestUrl = await generateRequestUrl(PVP_TIERS_INDEX_PATH, "static");
    return callApi<PvPTiersIndex>(requestUrl);
}

export async function fetchPvPTier(pvpTierId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_TIER_PATH, { pvpTierId }), "static");
    return callApi<PvPTier>(requestUrl);
}

export async function fetchPvPTierMedia(pvpTierId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_TIER_MEDIA_PATH, { pvpTierId }), "static");
    return callApi<PvPTierMedia>(requestUrl);
}
