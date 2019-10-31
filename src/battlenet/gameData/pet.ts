import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";

const PETS_INDEX_PATH = "/data/wow/pet/index ";
const PET_PATH = "/data/wow/pet/{petId}";

/**
 * Interface for API call: Game Data → Pet → Pets Index
 */
export interface PetsIndex extends ApiResponse {
    pets: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Pet → Pet
 */
export interface Pet extends ApiResponse {
    id: number;
    name: string;
    creature_display: {
        key: Key;
    };
    battle_pet_type: TypedName;
    description: string;
    is_capturable: boolean;
    is_tradable: boolean;
    is_battlepet: boolean;
    is_alliance_only: boolean;
    is_horde_only: boolean;
    abilities?: {
        ability: ShortEntry;
        slot: number;
        required_level: number;
    }[];
    source: TypedName;
    icon: string;
}

/**
 * Fetches an index of pets.
 *
 * @return  Promise that resolves to the pets index
 */
export async function fetchPetsIndex() {
    const requestUrl = await generateRequestUrl(PETS_INDEX_PATH, "static");
    return callApi<PetsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a pet.
 *
 * @param  petId   The pet identifier
 * @return  Promise that resolves to the pet information
 */
export async function fetchPet(petId: number) {
    const requestUrl = await generateRequestUrl(format(PET_PATH, { petId }), "static");
    return callApi<Pet>(requestUrl);
}
