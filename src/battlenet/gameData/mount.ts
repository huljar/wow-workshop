import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";

const MOUNTS_INDEX_PATH = "/data/wow/mount/index";
const MOUNT_PATH = "/data/wow/mount/{mountId}";

/**
 * Interface for API call: Game Data → Mount → Mounts Index
 */
export interface MountsIndex extends ApiResponse {
    mounts: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Mount → Mount
 */
export interface Mount extends ApiResponse {
    id: number;
    name: string;
    creature_displays: {
        key: Key;
    }[];
    description: string;
    source: TypedName;
}

/**
 * Fetches an index of mounts.
 *
 * @return  Promise that resolves to the mounts index
 */
export async function fetchMountsIndex() {
    const requestUrl = await generateRequestUrl(MOUNTS_INDEX_PATH, "static");
    return callApi<MountsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a mount.
 *
 * @param  mountId  The mount identifier
 * @return  Promise that resolves to the mount information
 */
export async function fetchMount(mountId: number) {
    const requestUrl = await generateRequestUrl(format(MOUNT_PATH, { mountId }), "static");
    return callApi<Mount>(requestUrl);
}
