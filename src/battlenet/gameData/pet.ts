import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const PETS_INDEX_PATH = "/data/wow/pet/index ";
const PET_PATH = "/data/wow/pet/{petId}";

export interface PetShort {
    key: Key;
    name: string;
    id: number;
}

export interface PetsIndex extends ApiResponse {
    pets: PetShort[];
}

export interface Pet extends ApiResponse {
    id: number;
    name: string;
    creature_display: {
        key: Key;
    };
    battle_pet_type: {
        type: string;
        name: string;
    };
    description: string;
    is_capturable: boolean;
    is_tradable: boolean;
    is_battlepet: boolean;
    is_alliance_only: boolean;
    is_horde_only: boolean;
    abilities?: {
        ability: {
            key: Key;
            name: string;
            id: number;
        };
        slot: number;
        required_level: number;
    }[];
    source: {
        type: string;
        name: string;
    };
    icon: string;
}

export async function fetchPetsIndex() {
    const requestUrl = await generateRequestUrl(PETS_INDEX_PATH, "static");
    return callApi<PetsIndex>(requestUrl);
}

export async function fetchPet(petId: number) {
    const requestUrl = await generateRequestUrl(format(PET_PATH, { petId }), "static");
    return callApi<Pet>(requestUrl);
}
