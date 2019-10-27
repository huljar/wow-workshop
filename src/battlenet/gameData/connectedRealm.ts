import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";
import { RealmDetails } from "./realm";

const CONNECTED_REALMS_INDEX_PATH = "/data/wow/connected-realm/index";
const CONNECTED_REALM_PATH = "/data/wow/connected-realm/{connectedRealmId}";

export interface ConnectedRealmsIndex extends ApiResponse {
    connected_realms: Key[];
}

export interface ConnectedRealm extends ApiResponse {
    id: number;
    has_queue: boolean;
    status: {
        type: string;
        name: string;
    };
    population: {
        type: string;
        name: string;
    };
    realms: RealmDetails[];
    mythic_leaderboards: Key;
}

export async function fetchConnectedRealmsIndex() {
    const requestUrl = await generateRequestUrl(CONNECTED_REALMS_INDEX_PATH, "dynamic");
    return callApi<ConnectedRealmsIndex>(requestUrl);
}

export async function fetchConnectedRealm(connectedRealmId: number) {
    const requestUrl = await generateRequestUrl(format(CONNECTED_REALM_PATH, { connectedRealmId }), "dynamic");
    return callApi<ConnectedRealm>(requestUrl);
}
