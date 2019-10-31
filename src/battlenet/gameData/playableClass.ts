import { ApiResponse, Key, ShortEntry, Asset, Gendered, generateRequestUrl, callApi, format } from "../utils";

const PLAYABLE_CLASSES_INDEX_PATH = "/data/wow/playable-class/index";
const PLAYABLE_CLASS_PATH = "/data/wow/playable-class/{classId}";
const PLAYABLE_CLASS_MEDIA_PATH = "/data/wow/media/playable-class/{playableClassId}";
const PVP_TALENT_SLOTS_PATH = "/data/wow/playable-class/{classId}/pvp-talent-slots";

/**
 * Interface for API call: Game Data → Playable Class → Playable Classes Index
 */
export interface PlayableClassesIndex extends ApiResponse {
    classes: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Playable Class → Playable Class
 */
export interface PlayableClass extends ApiResponse {
    id: number;
    name: string;
    gender_name: Gendered<string>;
    power_type: ShortEntry;
    specializations: ShortEntry[];
    media: {
        key: Key;
        id: number;
    };
    pvp_talent_slots: Key;
}

/**
 * Interface for API call: Game Data → Playable Class → Playable Class Media
 */
export interface PlayableClassMedia extends ApiResponse {
    assets: Asset[];
}

/**
 * Interface for API call: Game Data → Playable Class → PvP Talent Slots
 */
export interface PvPTalentSlots extends ApiResponse {
    talent_slots: {
        slot_number: number;
        unlock_player_level: number;
    }[];
}

/**
 * Fetches an index of playable classes.
 *
 * @return  Promise that resolves to the playable classes index
 */
export async function fetchPlayableClassesIndex() {
    const requestUrl = await generateRequestUrl(PLAYABLE_CLASSES_INDEX_PATH, "static");
    return callApi<PlayableClassesIndex>(requestUrl);
}

/**
 * Fetches detailed information about a playable class.
 *
 * @param  classId  The class identifier
 * @return  Promise that resolves to the playable class information
 */
export async function fetchPlayableClass(classId: number) {
    const requestUrl = await generateRequestUrl(format(PLAYABLE_CLASS_PATH, { classId }), "static");
    return callApi<PlayableClass>(requestUrl);
}

/**
 * Fetches media corresponding to the given playable class.
 *
 * @param  playableClassId  The playable class identifier
 * @return  Promise that resolves to the playable class media
 */
export async function fetchPlayableClassMedia(playableClassId: number) {
    const requestUrl = await generateRequestUrl(format(PLAYABLE_CLASS_MEDIA_PATH, { playableClassId }), "static");
    return callApi<PlayableClassMedia>(requestUrl);
}

/**
 * Fetches the PvP talent slots for the given class.
 *
 * @param  classId  The class identifier
 * @return  Promise that resolves to the PvP talent slots
 */
export async function fetchPvPTalentSlots(classId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_TALENT_SLOTS_PATH, { classId }), "static");
    return callApi<PvPTalentSlots>(requestUrl);
}
