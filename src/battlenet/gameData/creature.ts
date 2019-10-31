import { ApiResponse, Key, ShortEntry, Asset, generateRequestUrl, callApi, format } from "../utils";

const CREATURE_FAMILIES_INDEX_PATH = "/data/wow/creature-family/index";
const CREATURE_FAMILY_PATH = "/data/wow/creature-family/{creatureFamilyId}";
const CREATURE_TYPES_INDEX_PATH = "/data/wow/creature-type/index";
const CREATURE_TYPE_PATH = "/data/wow/creature-type/{creatureTypeId}";
const CREATURE_PATH = "/data/wow/creature/{creatureId}";
const CREATURE_DISPLAY_MEDIA_PATH = "/data/wow/media/creature-display/{creatureDisplayId}";
const CREATURE_FAMILY_MEDIA_PATH = "/data/wow/media/creature-family/{creatureFamilyId}";

/**
 * Interface for API call: Game Data → Creature → Creature Families Index
 */
export interface CreatureFamiliesIndex extends ApiResponse {
    creature_families: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Creature → Creature Family
 */
export interface CreatureFamily extends ApiResponse {
    id: number;
    name: string;
    specialization: ShortEntry;
    media: {
        key: Key;
        id: number;
    };
}

/**
 * Interface for API call: Game Data → Creature → Creature Types Index
 */
export interface CreatureTypesIndex extends ApiResponse {
    creature_types: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Creature → Creature Type
 */
export interface CreatureType extends ApiResponse {
    id: number;
    name: string;
}

/**
 * Interface for API call: Game Data → Creature → Creature
 */
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

/**
 * Interface for API call: Game Data → Creature → Creature Display Media
 */
export interface CreatureDisplayMedia extends ApiResponse {
    assets: Asset[];
}

/**
 * Interface for API call: Game Data → Creature → Creature Family Media
 */
export interface CreatureFamilyMedia extends ApiResponse {
    assets: Asset[];
}

/**
 * Fetches an index of creature families.
 *
 * @return  Promise that resolves to the creature families index
 */
export async function fetchCreatureFamiliesIndex() {
    const requestUrl = await generateRequestUrl(CREATURE_FAMILIES_INDEX_PATH, "static");
    return callApi<CreatureFamiliesIndex>(requestUrl);
}

/**
 * Fetches detailed information about a creature family.
 *
 * @param  creatureFamilyId  The creature family identifier
 * @return  Promise that resolves to the creature family information
 */
export async function fetchCreatureFamily(creatureFamilyId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_FAMILY_PATH, { creatureFamilyId }), "static");
    return callApi<CreatureFamily>(requestUrl);
}

/**
 * Fetches an index of creature types.
 *
 * @return  Promise that resolves to the creature types index
 */
export async function fetchCreatureTypesIndex() {
    const requestUrl = await generateRequestUrl(CREATURE_TYPES_INDEX_PATH, "static");
    return callApi<CreatureTypesIndex>(requestUrl);
}

/**
 * Fetches detailed information about a creature type.
 *
 * @param  creatureTypeId  The creature type identifier
 * @return  Promise that resolves to the creature type information
 */
export async function fetchCreatureType(creatureTypeId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_TYPE_PATH, { creatureTypeId }), "static");
    return callApi<CreatureType>(requestUrl);
}

/**
 * Fetches detailed information about a creature.
 *
 * @param  creatureId  The creature identifier
 * @return  Promise that resolves to the creature information
 */
export async function fetchCreature(creatureId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_PATH, { creatureId }), "static");
    return callApi<Creature>(requestUrl);
}

/**
 * Fetches display media corresponding to the given creature.
 *
 * @param  creatureDisplayId  The creature display identifier
 * @return  Promise that resolves to the creature display media
 */
export async function fetchCreatureDisplayMedia(creatureDisplayId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_DISPLAY_MEDIA_PATH, { creatureDisplayId }), "static");
    return callApi<CreatureDisplayMedia>(requestUrl);
}

/**
 * Fetches media corresponding to the given creature family.
 *
 * @param  creatureFamilyId  The creature family identifier
 * @return  Promise that resolves to the creature family media
 */
export async function fetchCreatureFamilyMedia(creatureFamilyId: number) {
    const requestUrl = await generateRequestUrl(format(CREATURE_FAMILY_MEDIA_PATH, { creatureFamilyId }), "static");
    return callApi<CreatureFamilyMedia>(requestUrl);
}
