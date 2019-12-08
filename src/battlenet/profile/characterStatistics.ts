import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_STATISTICS_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/statistics";

interface Stat {
    rating: number;
    rating_bonus: number;
}

interface ValuedStat extends Stat {
    value: number;
}

interface Attribute {
    base: number;
    effective: number;
}

/**
 * Interface for API call: Profile → Character Statistics → Character Statistics Summary
 */
export interface CharacterStatisticsSummary extends ApiResponse {
    health: number;
    power: number;
    power_type: ShortEntry;
    speed: Stat;
    strength: Attribute;
    agility: Attribute;
    intellect: Attribute;
    stamina: Attribute;
    melee_crit: ValuedStat;
    melee_haste: ValuedStat;
    mastery: ValuedStat;
    bonus_armor: number;
    lifesteal: ValuedStat;
    versatility: number;
    versatility_damage_done_bonus: number;
    versatility_healing_done_bonus: number;
    versatility_damage_taken_bonus: number;
    avoidance: Stat;
    attack_power: number;
    main_hand_damage_min: number;
    main_hand_damage_max: number;
    main_hand_speed: number;
    main_hand_dps: number;
    off_hand_damage_min: number;
    off_hand_damage_max: number;
    off_hand_speed: number;
    off_hand_dps: number;
    spell_power: number;
    spell_penetration: number;
    spell_crit: ValuedStat;
    mana_regen: number;
    mana_regen_combat: number;
    armor: Attribute;
    dodge: ValuedStat;
    parry: ValuedStat;
    block: ValuedStat;
    ranged_crit: ValuedStat;
    ranged_haste: ValuedStat;
    spell_haste: ValuedStat;
    character: CharacterShort;
}

/**
 * Fetches a summary of statistics of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character statistics summary
 */
export async function fetchCharacterStatisticsSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_STATISTICS_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterStatisticsSummary>(requestUrl);
}
