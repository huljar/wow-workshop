import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";

const REPUTATION_FACTIONS_INDEX_PATH = "/data/wow/reputation-faction/index";
const REPUTATION_FACTION_PATH = "/data/wow/reputation-faction/{reputationFactionId}";
const REPUTATION_TIERS_INDEX_PATH = "/data/wow/reputation-tiers/index";
const REPUTATION_TIERS_PATH = "/data/wow/reputation-tiers/{reputationTiersId}";

interface ReputationTierShortBase {
    key: Key;
}

interface DefaultReputationTierShort extends ReputationTierShortBase {
    id: 0;
}

interface NamedReputationTierShort extends ReputationTierShortBase {
    id: number;
    name: string;
}

interface ReputationFactionBase {
    id: number;
    name: string;
    reputation_tiers: DefaultReputationTierShort | NamedReputationTierShort;
}

interface LeafReputationFaction extends ReputationFactionBase {
    description: string;
    can_paragon?: true;
}

interface HeaderReputationFaction extends ReputationFactionBase {
    factions: ShortEntry[];
    player_faction?: TypedName;
    is_header: true;
    header_shows_bar?: true;
}

interface ReputationTiersBase {
    tiers: {
        name: string;
        min_value: number;
        max_value: number;
        id: number;
    }[];
}

interface DefaultReputationTiers extends ReputationTiersBase {
    id: 0;
}

interface NamedReputationTiers extends ReputationTiersBase {
    id: number;
    faction: ShortEntry;
}

/**
 * Interface for API call: Game Data → Reputations → Reputation Factions Index
 */
export interface ReputationFactionsIndex extends ApiResponse {
    factions: ShortEntry[];
    root_factions: ShortEntry[];
}

/**
 * Type for API call: Game Data → Reputations → Reputation Faction
 */
export type ReputationFaction = (LeafReputationFaction | HeaderReputationFaction) & ApiResponse;

/**
 * Interface for API call: Game Data → Reputations → Reputation Tiers Index
 */
export interface ReputationTiersIndex extends ApiResponse {
    reputation_tiers: [DefaultReputationTierShort, ...NamedReputationTierShort[]];
}

/**
 * Type for API call: Game Data → Reputations → Reputation Tiers
 */
export type ReputationTiers = (DefaultReputationTiers | NamedReputationTiers) & ApiResponse;

/**
 * Fetches an index of reputation factions.
 *
 * @return  Promise that resolves to the reputation factions index
 */
export async function fetchReputationFactionsIndex() {
    const requestUrl = await generateRequestUrl(REPUTATION_FACTIONS_INDEX_PATH, "static");
    return callApi<ReputationFactionsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a reputation faction.
 *
 * @param  reputationFactionId  The reputation faction identifier
 * @return  Promise that resolves to the reputation faction information
 */
export async function fetchReputationFaction(reputationFactionId: number) {
    const requestUrl = await generateRequestUrl(format(REPUTATION_FACTION_PATH, { reputationFactionId }), "static");
    return callApi<ReputationFaction>(requestUrl);
}

/**
 * Fetches an index of reputation tiers.
 *
 * @return  Promise that resolves to the reputation tiers index
 */
export async function fetchReputationTiersIndex() {
    const requestUrl = await generateRequestUrl(REPUTATION_TIERS_INDEX_PATH, "static");
    return callApi<ReputationTiersIndex>(requestUrl);
}

/**
 * Fetches detailed information about reputation tiers.
 *
 * @param  reputationTiersId  The reputation tiers identifier
 * @return  Promise that resolves to the reputation tiers information
 */
export async function fetchReputationTiers(reputationTiersId: number) {
    const requestUrl = await generateRequestUrl(format(REPUTATION_TIERS_PATH, { reputationTiersId }), "static");
    return callApi<ReputationTiers>(requestUrl);
}
