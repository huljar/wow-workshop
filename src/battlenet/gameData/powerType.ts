import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";

const POWER_TYPES_INDEX_PATH = "/data/wow/power-type/index";
const POWER_TYPE_PATH = "/data/wow/power-type/{powerTypeId}";

/**
 * Interface for API call: Game Data → Power Type → Power Types Index
 */
export interface PowerTypesIndex extends ApiResponse {
    power_types: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Power Type → Power Type
 */
export interface PowerType extends ApiResponse {
    id: number;
    name: string;
}

/**
 * Fetches an index of power types.
 *
 * @return  Promise that resolves to the power types index
 */
export async function fetchPowerTypesIndex() {
    const requestUrl = await generateRequestUrl(POWER_TYPES_INDEX_PATH, "static");
    return callApi<PowerTypesIndex>(requestUrl);
}

/**
 * Fetches detailed information about a power type.
 *
 * @param  powerTypeId  The power type identifier
 * @return  Promise that resolves to the power type information
 */
export async function fetchPowerType(powerTypeId: number) {
    const requestUrl = await generateRequestUrl(format(POWER_TYPE_PATH, { powerTypeId }), "static");
    return callApi<PowerType>(requestUrl);
}
