import { ApiResponse, Key, ShortEntry, Gendered, TypedName, generateRequestUrl, callApi, format } from "../utils";

const PLAYABLE_SPECIALIZATIONS_INDEX_PATH = "/data/wow/playable-specialization/index";
const PLAYABLE_SPECIALIZATION_PATH = "/data/wow/playable-specialization/{specId}";

interface Talent {
    talent: ShortEntry;
    spell_tooltip: {
        description: string;
        cast_time: string;
        power_cost?: string;
        range?: string;
        cooldown?: string;
    };
}

interface TalentTier {
    level: number;
    talents: Talent[];
}

/**
 * Interface for API call: Game Data → Playable Specialization → Playable Specializations Index
 */
export interface PlayableSpecializationsIndex extends ApiResponse {
    character_specializations: ShortEntry[];
    pet_specializations: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Playable Specialization → Playable Specialization
 */
export interface PlayableSpecialization extends ApiResponse {
    id: number;
    playable_class: ShortEntry;
    name: string;
    gender_description: Gendered<string>;
    media: {
        key: Key;
        id: number;
    };
    role: TypedName;
    talent_tiers: TalentTier[];
    pvp_talents: Talent[];
}

/**
 * Fetches an index of playable specializations.
 *
 * @return  Promise that resolves to the playable specializations index
 */
export async function fetchPlayableSpecializationsIndex() {
    const requestUrl = await generateRequestUrl(PLAYABLE_SPECIALIZATIONS_INDEX_PATH, "static");
    return callApi<PlayableSpecializationsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a playable specialization.
 *
 * @param  specId  The specifier identifier
 * @return  Promise that resolves to the playable specialization information
 */
export async function fetchPlayableSpecialization(specId: number) {
    const requestUrl = await generateRequestUrl(format(PLAYABLE_SPECIALIZATION_PATH, { specId }), "static");
    return callApi<PlayableSpecialization>(requestUrl);
}
