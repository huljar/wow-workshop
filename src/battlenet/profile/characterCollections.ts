import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";

const CHARACTER_COLLECTIONS_INDEX_PATH = "/profile/wow/character/{realmSlug}/{characterName}/collections";
const CHARACTER_MOUNTS_COLLECTION_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/collections";
const CHARACTER_PETS_COLLECTION_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/collections/pets";

export interface CharacterCollectionsIndex extends ApiResponse {
    pets: Key;
    mounts: Key;
}

export interface CharacterMountsCollectionSummary extends ApiResponse {
    mounts: {
        mount: ShortEntry;
    }[];
}

export interface CharacterPetsCollectionSummary extends ApiResponse {
    pets: {
        species: ShortEntry;
        level: number;
        quality: TypedName;
        stats: {
            breed_id: number;
            health: number;
            power: number;
            speed: number;
        };
    }[];
    unlocked_battle_pet_slots: number;
}

export async function fetchCharacterCollectionsIndex(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_COLLECTIONS_INDEX_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterCollectionsIndex>(requestUrl);
}

export async function fetchCharacterMountsCollectionSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_MOUNTS_COLLECTION_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterMountsCollectionSummary>(requestUrl);
}

export async function fetchCharacterPetsCollectionSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_PETS_COLLECTION_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterPetsCollectionSummary>(requestUrl);
}
