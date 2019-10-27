import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const REGIONS_INDEX_PATH = "/data/wow/region/index";
const REGION_PATH = "/data/wow/region/{regionId}";

interface RegionsIndexApiResponse extends ApiResponse {
    regions: Key[];
}

interface RegionShort {
    key: Key;
    id: number;
}

export interface RegionsIndex extends ApiResponse {
    regions: RegionShort[];
}

export interface Region extends ApiResponse {
    id: number;
    name: string;
    tag: string;
}

export async function fetchRegionsIndex(): Promise<RegionsIndex> {
    const requestUrl = await generateRequestUrl(REGIONS_INDEX_PATH, "dynamic");
    const result = await callApi<RegionsIndexApiResponse>(requestUrl);
    return {
        ...result,
        regions: result.regions.map(region => ({
            key: region,
            id: Number.parseInt(
                region.href.substring(
                    region.href.lastIndexOf("/", region.href.indexOf("?")) + 1,
                    region.href.indexOf("?")
                )
            )
        }))
    };
}

export async function fetchRegion(regionId: number) {
    const requestUrl = await generateRequestUrl(format(REGION_PATH, { regionId }), "dynamic");
    return callApi<Region>(requestUrl);
}
