import { ApiResponse, Key, ShortEntry, Asset, generateRequestUrl, callApi, format } from "../utils";

const AZERITE_ESSENCES_INDEX_PATH = "/data/wow/azerite-essence/index";
const AZERITE_ESSENCE_PATH = "/data/wow/azerite-essence/{azeriteEssenceId}";
const AZERITE_ESSENCE_MEDIA_PATH = "/data/wow/media/azerite-essence/{azeriteEssenceId}";

/**
 * Interface for API call: Game Data → Azerite Essence → Azerite Essences Index
 */
export interface AzeriteEssencesIndex extends ApiResponse {
    azerite_essences: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Azerite Essence → Azerite Essence
 */
export interface AzeriteEssence extends ApiResponse {
    id: number;
    name: string;
    allowed_specializations: ShortEntry[];
    powers: {
        id: number;
        rank: number;
        main_power_spell: ShortEntry;
        passive_power_spell: ShortEntry;
    }[];
    media: {
        key: Key;
        id: number;
    };
}

/**
 * Interface for API call: Game Data → Azerite Essence → Azerite Essence Media
 */
export interface AzeriteEssenceMedia extends ApiResponse {
    assets: Asset[];
}

/**
 * Fetches an index of all azerite essences.
 *
 * @return  Promise that resolves to the azerite essences index
 */
export async function fetchAzeriteEssencesIndex() {
    const requestUrl = await generateRequestUrl(AZERITE_ESSENCES_INDEX_PATH, "static");
    return callApi<AzeriteEssencesIndex>(requestUrl);
}

/**
 * Fetches detailed information about an azerite essence.
 *
 * @param  azeriteEssenceId  The azerite essence identifier
 * @return  Promise that resolves to the azerite essence information
 */
export async function fetchAzeriteEssence(azeriteEssenceId: number) {
    const requestUrl = await generateRequestUrl(format(AZERITE_ESSENCE_PATH, { azeriteEssenceId }), "static");
    return callApi<AzeriteEssence>(requestUrl);
}

/**
 * Fetches media corresponding to the given azerite essence.
 *
 * @param  azeriteEssenceId  The azerite essence identifier
 * @return  Promise that resolves to the azerite essence media
 */
export async function fetchAzeriteEssenceMedia(azeriteEssenceId: number) {
    const requestUrl = await generateRequestUrl(format(AZERITE_ESSENCE_MEDIA_PATH, { azeriteEssenceId }), "static");
    return callApi<AzeriteEssenceMedia>(requestUrl);
}
