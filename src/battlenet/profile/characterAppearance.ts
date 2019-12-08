import { ApiResponse, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";
import { GuildCrest } from "./guild";

const CHARACTER_APPEARANCE_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/appearance";

/**
 * { item_description }
 */
export interface CharacterAppearanceSummary extends ApiResponse {
    character: CharacterShort;
    playable_race: ShortEntry;
    playable_class: ShortEntry;
    active_spec: ShortEntry;
    guild_crest: GuildCrest;
    appearance: {
        face_variation: number;
        skin_color: number;
        hair_variation: number;
        hair_color: number;
        feature_variation: number;
        custom_display_options: number[];
    };
    items: {
        id: number;
        slot: TypedName;
        enchant: number;
        item_appearance_modifier_id: number;
        internal_slot_id: number;
        subclass: number;
    }[];
}

/**
 * Fetches a character appearance summary.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 */
export async function fetchCharacterAppearanceSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_APPEARANCE_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterAppearanceSummary>(requestUrl);
}
