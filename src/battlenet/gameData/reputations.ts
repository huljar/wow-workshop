import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const REPUTATION_FACTIONS_INDEX_PATH = "/data/wow/reputation-faction/index";
const REPUTATION_FACTION_PATH = "/data/wow/reputation-faction/{reputationFactionId}";
const REPUTATION_TIERS_INDEX_PATH = "/data/wow/reputation-tiers/index";
const REPUTATION_TIERS_PATH = "/data/wow/reputation-tiers/{reputationTiersId}";

export interface ReputationFactionShort {
    key: Key;
    name: string;
    id: number;
}

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
    factions: ReputationFactionShort[];
    player_faction?: {
        type: string;
        name: string;
    };
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
    faction: ReputationFactionShort;
}

export interface ReputationFactionsIndex extends ApiResponse {
    factions: ReputationFactionShort[];
    root_factions: ReputationFactionShort[];
}

export type ReputationFaction = (LeafReputationFaction | HeaderReputationFaction) & ApiResponse;

export interface ReputationTiersIndex extends ApiResponse {
    reputation_tiers: [DefaultReputationTierShort, ...NamedReputationTierShort[]];
}

export type ReputationTiers = (DefaultReputationTiers | NamedReputationTiers) & ApiResponse;

/**
 * Fetches a reputation factions index.
 */
export async function fetchReputationFactionsIndex() {
    const requestUrl = await generateRequestUrl(REPUTATION_FACTIONS_INDEX_PATH, "static");
    return callApi<ReputationFactionsIndex>(requestUrl);
}

/**
 * Fetches a reputation faction.
 *
 * @param      {number}  reputationFactionId  The reputation faction identifier
 */
export async function fetchReputationFaction(reputationFactionId: number) {
    const requestUrl = await generateRequestUrl(format(REPUTATION_FACTION_PATH, { reputationFactionId }), "static");
    return callApi<ReputationFaction>(requestUrl);
}

/**
 * Fetches a reputation tiers index.
 */
export async function fetchReputationTiersIndex() {
    const requestUrl = await generateRequestUrl(REPUTATION_TIERS_INDEX_PATH, "static");
    return callApi<ReputationTiersIndex>(requestUrl);
}

/**
 * Fetches reputation tiers.
 *
 * @param      {number}  reputationTiersId  The reputation tiers identifier
 */
export async function fetchReputationTiers(reputationTiersId: number) {
    const requestUrl = await generateRequestUrl(format(REPUTATION_TIERS_PATH, { reputationTiersId }), "static");
    return callApi<ReputationTiers>(requestUrl);
}
