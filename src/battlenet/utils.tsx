enum Region {
    EU = "eu",
    US = "us",
    KR = "kr",
    TW = "tw"
}

export const REGION: Region = Region.EU;
export const BASE_URL = `https://${REGION}.battle.net/`;
export const OAUTH_PATH = "oauth/token";