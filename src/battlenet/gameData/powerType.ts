import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const POWER_TYPES_INDEX_PATH = "/data/wow/power-type/index";
const POWER_TYPE_PATH = "/data/wow/power-type/{powerTypeId}";

export interface PowerTypeShort {
    key: Key;
    name: string;
    id: number;
}

export interface PowerTypesIndex extends ApiResponse {
    power_types: PowerTypeShort[];
}

export interface PowerType extends ApiResponse {
    id: number;
    name: string;
}

export async function fetchPowerTypesIndex() {
    const requestUrl = await generateRequestUrl(POWER_TYPES_INDEX_PATH, "static");
    return callApi<PowerTypesIndex>(requestUrl);
}

export async function fetchRealmIndex(powerTypeId: number) {
    const requestUrl = await generateRequestUrl(format(POWER_TYPE_PATH, { powerTypeId }), "static");
    return callApi<PowerType>(requestUrl);
}
