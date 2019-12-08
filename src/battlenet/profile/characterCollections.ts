import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";

const CHARACTER_COLLECTIONS_INDEX_PATH = "/profile/wow/character/{realmSlug}/{characterName}/collections";
const CHARACTER_MOUNTS_COLLECTION_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/collections";
const CHARACTER_PETS_COLLECTION_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/collections/pets";

/**
 * Interface for API call: Profile → Character Collections → Character Collections Index
 */
export interface CharacterCollectionsIndex extends ApiResponse {
    pets: Key;
    mounts: Key;
}

/**
 * Interface for API call: Profile → Character Collections → Character Mount Collection Summary
 */
export interface CharacterMountsCollectionSummary extends ApiResponse {
    mounts: {
        mount: ShortEntry;
    }[];
}

/**
 * Interface for API call: Profile → Character Collections → Character Pets Collection Summary
 */
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

/**
 * Fetches an index of character collections.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character collections index
 */
export async function fetchCharacterCollectionsIndex(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_COLLECTIONS_INDEX_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterCollectionsIndex>(requestUrl);
}

/**
 * Fetches a summary of the mounts collection of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character mounts collection summary
 */
export async function fetchCharacterMountsCollectionSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_MOUNTS_COLLECTION_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterMountsCollectionSummary>(requestUrl);
}

/**
 * Fetches a summary of the pets collection of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character pets collection summary
 */
export async function fetchCharacterPetsCollectionSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_PETS_COLLECTION_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterPetsCollectionSummary>(requestUrl);
}
