import { ApiResponse, Key, ShortEntry, Asset, generateRequestUrl, callApi, format } from "../utils";

const AZERITE_ESSENCES_INDEX_PATH = "/data/wow/azerite-essence/index";
const AZERITE_ESSENCE_PATH = "/data/wow/azerite-essence/{azeriteEssenceId}";
const AZERITE_ESSENCE_MEDIA_PATH = "/data/wow/media/azerite-essence/{azeriteEssenceId}";

export interface AzeriteEssencesIndex extends ApiResponse {
    azerite_essences: ShortEntry[];
}

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

export interface AzeriteEssenceMedia extends ApiResponse {
    assets: Asset[];
}

export async function fetchAzeriteEssencesIndex() {
    const requestUrl = await generateRequestUrl(AZERITE_ESSENCES_INDEX_PATH, "static");
    return callApi<AzeriteEssencesIndex>(requestUrl);
}

export async function fetchAzeriteEssence(azeriteEssenceId: number) {
    const requestUrl = await generateRequestUrl(format(AZERITE_ESSENCE_PATH, { azeriteEssenceId }), "static");
    return callApi<AzeriteEssence>(requestUrl);
}

export async function fetchAzeriteEssenceMedia(azeriteEssenceId: number) {
    const requestUrl = await generateRequestUrl(format(AZERITE_ESSENCE_MEDIA_PATH, { azeriteEssenceId }), "static");
    return callApi<AzeriteEssenceMedia>(requestUrl);
}
