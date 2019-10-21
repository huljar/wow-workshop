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

export async function generateRequestUrl(path: string, namespace: Namespace) {
    // build URL: start with API base
    let url = API_BASE_URL;

    // add separator if necessary
    if (!path.startsWith("/")) {
        url += "/";
    }

    // add the specified path
    url += path;

    // add query string or parameter separator if necessary
    if (path.includes("?")) {
        if (!path.endsWith("?") && !path.endsWith("&")) {
            url += "&";
        }
    } else {
        url += "?";
    }

    // add namespace
    url += `namespace=${namespace}-${REGION}`;

    // add access token
    const accessToken = await getAccessToken();
    url += `&access_token=${accessToken.access_token}`;

    return url;
}
