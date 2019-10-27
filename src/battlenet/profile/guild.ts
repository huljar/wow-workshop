import { RealmShort } from "../gameData/realm";

export interface GuildShort {
    key: {
        href: string;
    };
    name: string;
    id: number;
    realm: RealmShort;
}

export interface GuildCrest {}
