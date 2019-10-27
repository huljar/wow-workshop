import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";
import { ClassShort } from "./playableClass";

const PLAYABLE_SPECIALIZATIONS_INDEX_PATH = "/data/wow/playable-specialization/index";
const PLAYABLE_SPECIALIZATION_PATH = "/data/wow/playable-specialization/{specId}";

export interface SpecializationShort {
    key: Key;
    name: string;
    id: number;
}

interface Talent {
    talent: {
        key: Key;
        name: string;
        id: number;
    };
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

export interface PlayableSpecializationsIndex extends ApiResponse {
    character_specializations: SpecializationShort[];
    pet_specializations: SpecializationShort[];
}

export interface PlayableSpecialization extends ApiResponse {
    id: number;
    playable_class: ClassShort;
    name: string;
    gender_description: {
        male: string;
        female: string;
    };
    media: {
        key: Key;
        id: number;
    };
    role: {
        type: string;
        name: string;
    };
    talent_tiers: TalentTier[];
    pvp_talents: Talent[];
}

export async function fetchPlayableSpecializationsIndex() {
    const requestUrl = await generateRequestUrl(PLAYABLE_SPECIALIZATIONS_INDEX_PATH, "static");
    return callApi<PlayableSpecializationsIndex>(requestUrl);
}

export async function fetchPlayableSpecialization(specId: number) {
    const requestUrl = await generateRequestUrl(format(PLAYABLE_SPECIALIZATION_PATH, { specId }), "static");
    return callApi<PlayableSpecialization>(requestUrl);
}
