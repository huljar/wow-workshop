import { ApiResponse, generateRequestUrl, callApi } from "../utils";

const WOW_TOKEN_INDEX_PATH = "/data/wow/token/index";

/**
 * Interface for API call: Game Data → WoW Token → WoW Token Index
 */
export interface WoWTokenIndex extends ApiResponse {
    last_updated_timestamp: number;
    price: number;
}

/**
 * Fetches the current status of WoW Tokens.
 */
export async function fetchWoWTokenIndex() {
    const requestUrl = await generateRequestUrl(WOW_TOKEN_INDEX_PATH, "dynamic");
    return callApi<WoWTokenIndex>(requestUrl);
}
