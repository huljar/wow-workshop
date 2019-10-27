import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const MOUNTS_INDEX_PATH = "/data/wow/mount/index";
const MOUNT_PATH = "/data/wow/mount/{mountId}";

interface MountShort {
    key: Key;
    name: string;
    id: number;
}

export interface MountsIndex extends ApiResponse {
    mounts: MountShort[];
}

export interface Mount extends ApiResponse {
    id: number;
    name: string;
    creature_displays: {
        key: Key;
    }[];
    description: string;
    source: {
        type: string;
        name: string;
    };
}

export async function fetchMountsIndex() {
    const requestUrl = await generateRequestUrl(MOUNTS_INDEX_PATH, "static");
    return callApi<MountsIndex>(requestUrl);
}

export async function fetchMount(mountId: number) {
    const requestUrl = await generateRequestUrl(format(MOUNT_PATH, { mountId }), "static");
    return callApi<Mount>(requestUrl);
}
