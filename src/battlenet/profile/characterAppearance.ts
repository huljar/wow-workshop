import { ApiResponse, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";
import { RaceShort } from "../gameData/playableRace";
import { ClassShort } from "../gameData/playableClass";
import { SpecializationShort } from "../gameData/playableSpecialization";
import { GuildCrest } from "./guild";
import { ItemShort } from "../gameData/item";

const CHARACTER_APPEARANCE_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/appearance";

/**
 * { item_description }
 */
export interface CharacterAppearanceSummary extends ApiResponse {
    character: CharacterShort;
    playable_race: RaceShort;
    playable_class: ClassShort;
    active_spec: SpecializationShort;
    guild_crest: GuildCrest;
    appearance: {
        face_variation: number;
        skin_color: number;
        hair_variation: number;
        hair_color: number;
        feature_variation: number;
        custom_display_options: number[];
    };
    items: ItemShort[];
}

/**
 * Fetches a character appearance summary.
 *
 * @param      {string}  realmSlug      The realm slug
 * @param      {string}  characterName  The character name
 */
export async function fetchCharacterAppearanceSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_APPEARANCE_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterAppearanceSummary>(requestUrl);
}
