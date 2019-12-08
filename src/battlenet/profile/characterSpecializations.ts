import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_SPECIALIZATIONS_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/specializations";

interface Talent {
    talent: ShortEntry;
    spell_tooltip: {
        spell: ShortEntry;
        description: string;
        cast_time: string;
        power_cost?: string;
        range?: string;
        cooldown?: string;
    };
}

/**
 * Interface for API call: Profile → Character Specializations → Character Specializations Summary
 */
export interface CharacterSpecializationsSummary extends ApiResponse {
    specializations: {
        specialization: ShortEntry;
        talents?: Talent[];
        pvp_talent_slots?: {
            selected: Talent;
            slot_number: number;
        }[];
    }[];
    active_specialization: ShortEntry;
    character: CharacterShort;
}

/**
 * Fetches a summary of specializations of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character specializations summary
 */
export async function fetchCharacterSpecializationsSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_SPECIALIZATIONS_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterSpecializationsSummary>(requestUrl);
}
