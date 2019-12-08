import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_EQUIPMENT_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/equipment";

interface DefaultAzeriteDetails {
    selected_powers: {
        id: number;
        tier: number;
        spell_tooltip: {
            spell: ShortEntry;
            description: string;
            cast_time: string;
        };
        is_display_hidden?: true;
    }[];
}

interface SecondarySelectedEssence {
    slot: number;
    rank: number;
    passive_spell_tooltip: {
        spell: ShortEntry;
        description: string;
        cast_time: string;
    };
    essence: ShortEntry;
    media: {
        key: Key;
        id: number;
    };
}

interface PrimarySelectedEssence extends SecondarySelectedEssence {
    main_spell_tooltip: {
        spell: ShortEntry;
        description: string;
        cast_time: string;
        range?: string;
    };
}

interface HeartOfAzerothAzeriteDetails {
    percentage_to_next_level: number;
    selected_essences: [PrimarySelectedEssence, ...SecondarySelectedEssence[]];
}

/**
 * Interface for API call: Profile → Character Equipment → Character Equipment Summary
 */
export interface CharacterEquipmentSummary extends ApiResponse {
    character: CharacterShort;
    equipped_items: {
        item: {
            key: Key;
            id: number;
        };
        slot: TypedName;
        quantity: number;
        context: number;
        bonus_list?: number[];
        quality: TypedName;
        name: string;
        modified_appearance_id?: number;
        azerite_details?: DefaultAzeriteDetails | HeartOfAzerothAzeriteDetails;
        name_description?: string;
        media: {
            key: Key;
            id: number;
        };
        item_class: ShortEntry;
        item_subclass: ShortEntry;
        inventory_type: TypedName;
        binding: TypedName;
        armor?: {
            value: number;
            display_string: string;
        };
        spells?: {
            spell: ShortEntry;
            description: string;
        };
        stats?: {
            type: TypedName;
            value: number;
            display_string: string;
            is_negated?: true;
            is_equip_bonus?: true;
        }[];
        sell_price?: {
            value: number;
            display_strings: {
                header: string;
                gold: string;
                silver: string;
                copper: string;
            };
        };
        requirements?: {
            level: {
                value: number;
                display_string: string;
            };
        };
        level: {
            value: number;
            display_string: string;
        };
        durability?: {
            value: number;
            display_string: string;
        };
        transmog?: {
            item: ShortEntry;
            display_string: string;
            item_modified_appearance_id: number;
        };
        is_subclass_hidden?: true;
    }[];
}

/**
 * Fetches a summary of equipment of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character achievements summary
 */
export async function fetchCharacterEquipmentSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_EQUIPMENT_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterEquipmentSummary>(requestUrl);
}
