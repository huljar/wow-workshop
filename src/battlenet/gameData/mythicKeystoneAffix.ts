import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const MYTHIC_KEYSTONE_AFFIXES_INDEX_PATH = "/data/wow/keystone-affix/index";
const MYTHIC_KEYSTONE_AFFIX_PATH = "/data/wow/keystone-affix/{keystoneAffixId}";

export interface MythicKeystoneAffixShort {
    key: Key;
    name: string;
    id: number;
}

export interface MythicKeystoneAffixesIndex extends ApiResponse {
    affixes: MythicKeystoneAffixShort[];
}

export interface MythicKeystoneAffix extends ApiResponse {
    id: number;
    name: string;
    description: string;
    media: {
        key: Key;
        id: number;
    };
}

export async function fetchMythicKeystoneAffixesIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_AFFIXES_INDEX_PATH, "static");
    return callApi<MythicKeystoneAffixesIndex>(requestUrl);
}

export async function fetchMythicKeystoneAffix(keystoneAffixId: number) {
    const requestUrl = await generateRequestUrl(format(MYTHIC_KEYSTONE_AFFIX_PATH, { keystoneAffixId }), "static");
    return callApi<MythicKeystoneAffix>(requestUrl);
}
