import { ApiResponse, generateRequestUrl, callApi } from "../utils";

const WOW_TOKEN_INDEX_PATH = "/data/wow/token/index";

export interface WoWTokenIndex extends ApiResponse {
    last_updated_timestamp: number;
    price: number;
}

export async function fetchWoWTokenIndex() {
    const requestUrl = await generateRequestUrl(WOW_TOKEN_INDEX_PATH, "dynamic");
    return callApi<WoWTokenIndex>(requestUrl);
}
