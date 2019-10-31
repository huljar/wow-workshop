import { ApiResponse, Key, TypedName, generateRequestUrl, callApi, format } from "../utils";
import { RealmDetails } from "./realm";

const CONNECTED_REALMS_INDEX_PATH = "/data/wow/connected-realm/index";
const CONNECTED_REALM_PATH = "/data/wow/connected-realm/{connectedRealmId}";

/**
 * Interface for API call: Game Data → Connected Realm → Connected Realm Index
 */
export interface ConnectedRealmsIndex extends ApiResponse {
    connected_realms: Key[];
}

/**
 * Interface for API call: Game Data → Connected Realm → Connected Realm
 */
export interface ConnectedRealm extends ApiResponse {
    id: number;
    has_queue: boolean;
    status: TypedName;
    population: TypedName;
    realms: RealmDetails[];
    mythic_leaderboards: Key;
}

/**
 * Fetches an index of connected realms.
 *
 * @return  Promise that resolves to the connected realms index
 */
export async function fetchConnectedRealmsIndex() {
    const requestUrl = await generateRequestUrl(CONNECTED_REALMS_INDEX_PATH, "dynamic");
    return callApi<ConnectedRealmsIndex>(requestUrl);
}

/**
 * Fetches detailed information about a connected realm.
 *
 * @param  connectedRealmId  The connected realm identifier
 * @return  Promise that resolves to the connected realm information
 */
export async function fetchConnectedRealm(connectedRealmId: number) {
    const requestUrl = await generateRequestUrl(format(CONNECTED_REALM_PATH, { connectedRealmId }), "dynamic");
    return callApi<ConnectedRealm>(requestUrl);
}
