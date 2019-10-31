import { ShortEntry } from "../utils";
import { RealmShort } from "../gameData/realm";

export interface GuildShort extends ShortEntry {
    realm: RealmShort;
}

export interface GuildCrest {}
