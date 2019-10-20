import { getAccessToken } from "./auth";

enum Region {
    EU = "eu",
    US = "us",
    KR = "kr",
    TW = "tw"
}

export const REGION: Region = Region.EU;
export const API_BASE_URL = `https://${REGION}.api.blizzard.com`;
export const BNET_BASE_URL = `https://${REGION}.battle.net`;

export type Namespace = "static" | "dynamic" | "profile";

export async function generateHeaders(
    namespace: Namespace,
    additionalHeaders?: { [name: string]: string }
): Promise<Headers> {
    // init headers object with provided additional headers
    const headers = new Headers(additionalHeaders);

    // add authorization header (access token)
    const accessToken = await getAccessToken();
    headers.append("Authorization", `Bearer ${accessToken.access_token}`);

    // add namespace header (required for every request)
    headers.append("Battlenet-Namespace", `${namespace}-${REGION}`);

    return headers;
}
