import { ApiResponse, Key, Gendered, generateRequestUrl, callApi, format } from "../utils";

const PLAYABLE_RACES_INDEX_PATH = "/data/wow/playable-race/index";
const PLAYABLE_RACE_PATH = "/data/wow/playable-race/{playableRaceId}";

export interface RaceShort {
    key: Key;
    name: string;
    id: number;
}

export interface PlayableRacesIndex extends ApiResponse {
    races: RaceShort[];
}

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

export async function PlayableRacesIndex() {
    const requestUrl = await generateRequestUrl(PLAYABLE_RACES_INDEX_PATH, "static");
    return callApi<PlayableRacesIndex>(requestUrl);
}

export async function fetchPlayableRace(playableRaceId: number) {
    const requestUrl = await generateRequestUrl(format(PLAYABLE_RACE_PATH, { playableRaceId }), "static");
    return callApi<PlayableRace>(requestUrl);
}
