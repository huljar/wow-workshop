import { ApiResponse, ShortEntry, Gendered, generateRequestUrl, callApi, format } from "../utils";

const PLAYABLE_RACES_INDEX_PATH = "/data/wow/playable-race/index";
const PLAYABLE_RACE_PATH = "/data/wow/playable-race/{playableRaceId}";

/**
 * Interface for API call: Game Data → Playable Race → Playable Races Index
 */
export interface PlayableRacesIndex extends ApiResponse {
    races: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Playable Race → Playable Race
 */
export interface PlayableRace extends ApiResponse {
    id: number;
    name: string;
    gender_name: Gendered<string>;
    faction: {
        type: string;
        name: string;
    };
    is_selectable: boolean;
    is_allied_race: boolean;
}

/**
 * Fetches an index of playable races.
 *
 * @return  Promise that resolves to the playable races index
 */
export async function fetchPlayableRacesIndex() {
    const requestUrl = await generateRequestUrl(PLAYABLE_RACES_INDEX_PATH, "static");
    return callApi<PlayableRacesIndex>(requestUrl);
}

/**
 * Fetches detailed information about a playable race.
 *
 * @param  playableRaceId  The playable race identifier
 * @return  Promise that resolves to the playable race information
 */
export async function fetchPlayableRace(playableRaceId: number) {
    const requestUrl = await generateRequestUrl(format(PLAYABLE_RACE_PATH, { playableRaceId }), "static");
    return callApi<PlayableRace>(requestUrl);
}
