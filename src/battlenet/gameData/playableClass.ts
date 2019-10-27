import { ApiResponse, Key, Gendered, generateRequestUrl, callApi, format } from "../utils";
import { PowerTypeShort } from "./powerType";
import { SpecializationShort } from "./playableSpecialization";

const PLAYABLE_CLASSES_INDEX_PATH = "/data/wow/playable-class/index";
const PLAYABLE_CLASS_PATH = "/data/wow/playable-class/{classId}";
const PLAYABLE_CLASS_MEDIA_PATH = "/data/wow/media/playable-class/{playableClassId}";
const PVP_TALENT_SLOTS_PATH = "/data/wow/playable-class/{classId}/pvp-talent-slots";

export interface ClassShort {
    key: Key;
    name: string;
    id: number;
}

export interface PlayableClassesIndex extends ApiResponse {
    classes: ClassShort[];
}

export interface PlayableClass extends ApiResponse {
    id: number;
    name: string;
    gender_name: Gendered<string>;
    power_type: PowerTypeShort;
    specializations: SpecializationShort[];
    media: {
        key: Key;
        id: number;
    };
    pvp_talent_slots: Key;
}

export interface PlayableClassMedia extends ApiResponse {
    assets: {
        key: string;
        value: string;
    }[];
}

export interface PvPTalentSlots extends ApiResponse {
    talent_slots: {
        slot_number: number;
        unlock_player_level: number;
    }[];
}

export async function fetchPlayableClassesIndex() {
    const requestUrl = await generateRequestUrl(PLAYABLE_CLASSES_INDEX_PATH, "static");
    return callApi<PlayableClassesIndex>(requestUrl);
}

export async function fetchPlayableClass(classId: number) {
    const requestUrl = await generateRequestUrl(format(PLAYABLE_CLASS_PATH, { classId }), "static");
    return callApi<PlayableClass>(requestUrl);
}

export async function fetchPlayableClassMedia(playableClassId: number) {
    const requestUrl = await generateRequestUrl(format(PLAYABLE_CLASS_MEDIA_PATH, { playableClassId }), "static");
    return callApi<PlayableClassMedia>(requestUrl);
}

export async function fetchPvPTalentSlots(classId: number) {
    const requestUrl = await generateRequestUrl(format(PVP_TALENT_SLOTS_PATH, { classId }), "static");
    return callApi<PvPTalentSlots>(requestUrl);
}
