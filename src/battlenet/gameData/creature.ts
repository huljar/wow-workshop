import { ApiResponse, Key, ShortEntry, Asset, generateRequestUrl, callApi, format } from "../utils";

const CREATURE_FAMILIES_INDEX_PATH = "/data/wow/creature-family/index";
const CREATURE_FAMILY_PATH = "/data/wow/creature-family/{creatureFamilyId}";
const CREATURE_TYPES_INDEX_PATH = "/data/wow/creature-type/index";
const CREATURE_TYPE_PATH = "/data/wow/creature-type/{creatureTypeId}";
const CREATURE_PATH = "/data/wow/creature/{creatureId}";
const CREATURE_DISPLAY_MEDIA_PATH = "/data/wow/media/creature-display/{creatureDisplayId}";
const CREATURE_FAMILY_MEDIA_PATH = "/data/wow/media/creature-family/{creatureFamilyId}";

export interface CreatureFamiliesIndex extends ApiResponse {
    creature_families: ShortEntry[];
}

export interface CreatureFamily extends ApiResponse {
    id: number;
    name: string;
    specialization: ShortEntry;
    media: {
        key: Key;
        id: number;
    };
}

export interface CreatureTypesIndex extends ApiResponse {
    creature_types: ShortEntry[];
}

export interface CreatureType extends ApiResponse {
    id: number;
    name: string;
}

export interface Creature extends ApiResponse {
    id: number;
    name: string;
    type: ShortEntry;
    family: ShortEntry;
    creature_displays: {
        key: Key;
    }[];
    is_tameable: boolean;
}

export interface CreatureDisplayMedia extends ApiResponse {
    assets: Asset[];
}

export interface CreatureFamilyMedia extends ApiResponse {
    assets: Asset[];
}

export async function fetchCreatureFamiliesIndex() {
    const requestUrl = await generateRequestUrl(CREATURE_FAMILIES_INDEX_PATH, "static");
    return callApi<CreatureFamiliesIndex>(requestUrl);
}

export async function fetchCreatureFamily(creatureFamilyId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_FAMILY_PATH, { creatureFamilyId }), "static");
    return callApi<CreatureFamily>(requestUrl);
}

export async function fetchCreatureTypesIndex() {
    const requestUrl = await generateRequestUrl(CREATURE_TYPES_INDEX_PATH, "static");
    return callApi<CreatureTypesIndex>(requestUrl);
}

export async function fetchCreatureType(creatureTypeId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_TYPE_PATH, { creatureTypeId }), "static");
    return callApi<CreatureType>(requestUrl);
}

export async function fetchCreature(creatureId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_PATH, { creatureId }), "static");
    return callApi<Creature>(requestUrl);
}

export async function fetchCreatureDisplayMedia(creatureDisplayId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_DISPLAY_MEDIA_PATH, { creatureDisplayId }), "static");
    return callApi<CreatureDisplayMedia>(requestUrl);
}

export async function fetchCreatureFamilyMedia(creatureFamilyId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_FAMILY_MEDIA_PATH, { creatureFamilyId }), "static");
    return callApi<CreatureFamilyMedia>(requestUrl);
}
