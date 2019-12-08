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

/**
 * Interface for API call: Game Data → Region → Regions Index
 *
 * The API response in enriched with an ID for easier processing.
 */
export interface RegionsIndex extends ApiResponse {
    regions: RegionShort[];
}

/**
 * Interface for API call: Game Data → Region → Region
 */
export interface Region extends ApiResponse {
    id: number;
    name: string;
    tag: string;
}

/**
 * Fetches an index of regions and enhances each region with an ID parsed from the response.
 *
 * @return  Promise that resolves to the regions index
 */
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

/**
 * Fetches detailed information about a region.
 *
 * @param  regionId  The region identifier
 * @return  Promise that resolves to the region information
 */
export async function fetchRegion(regionId: number) {
    const requestUrl = await generateRequestUrl(format(REGION_PATH, { regionId }), "dynamic");
    return callApi<Region>(requestUrl);
}
