import { ApiResponse, Key, ShortEntry, generateRequestUrl, callApi, format } from "../utils";

const MYTHIC_KEYSTONE_AFFIXES_INDEX_PATH = "/data/wow/keystone-affix/index";
const MYTHIC_KEYSTONE_AFFIX_PATH = "/data/wow/keystone-affix/{keystoneAffixId}";

/**
 * Interface for API call: Game Data → Mythic Keystone Affix → Mythic Keystone Affixes Index
 */
export interface MythicKeystoneAffixesIndex extends ApiResponse {
    affixes: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Mythic Keystone Affix → Mythic Keystone Affix
 */
export interface MythicKeystoneAffix extends ApiResponse {
    id: number;
    name: string;
    description: string;
    media: {
        key: Key;
        id: number;
    };
}

/**
 * Fetches an index of mythic keystone affixes.
 *
 * @return  Promise that resolves to the affix index
 */
export async function fetchMythicKeystoneAffixesIndex() {
    const requestUrl = await generateRequestUrl(MYTHIC_KEYSTONE_AFFIXES_INDEX_PATH, "static");
    return callApi<MythicKeystoneAffixesIndex>(requestUrl);
}

/**
 * Fetches detailed information about a mythic keystone affix.
 *
 * @param  keystoneAffixId  The keystone affix identifier
 * @return  Promise that resolves to tho affix information
 */
export async function fetchMythicKeystoneAffix(keystoneAffixId: number) {
    const requestUrl = await generateRequestUrl(format(MYTHIC_KEYSTONE_AFFIX_PATH, { keystoneAffixId }), "static");
    return callApi<MythicKeystoneAffix>(requestUrl);
}
