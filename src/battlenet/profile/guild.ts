import { ApiResponse, ShortEntry, Key, Color, TypedName, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";
import { CharacterAchievement } from "./characterAchievements";
import { RealmShort } from "../gameData/realm";
import { ComponentShort } from "../gameData/guildCrest";

const GUILD_PATH = "/data/wow/guild/{realmSlug}/{nameSlug}";
const GUILD_ACHIEVEMENTS_PATH = "/data/wow/guild/{realmSlug}/{nameSlug}/achievements";
const GUILD_ROSTER_PATH = "/data/wow/guild/{realmSlug}/{nameSlug}/roster";

type GuildShort = CharacterShort;
type GuildAchievement = CharacterAchievement;

interface Component extends ComponentShort {
    color: Color;
}

export interface GuildCrest {
    emblem: Component;
    border: Component;
    background: {
        color: Color;
    };
}

export interface Guild extends ApiResponse {
    id: number;
    name: string;
    faction: TypedName;
    achievement_points: number;
    member_count: number;
    realm: RealmShort;
    crest: GuildCrest;
    roster: Key;
    achievements: Key;
    created_timestamp: number;
}

export interface GuildAchievements extends ApiResponse {
    guild: GuildShort;
    total_quantity: number;
    total_points: number;
    achievements: GuildAchievement[];
    category_progress: {
        category: ShortEntry;
        quantity: number;
        points: number;
    }[];
    recent_events: {
        achievement: ShortEntry;
        timestamp: number;
    }[];
}

export interface GuildRoster extends ApiResponse {
    guild: GuildShort;
    members: {
        character: {
            name: string;
            id: number;
            realm: {
                key: Key;
                id: number;
                slug: string;
            };
            level: number;
            playable_class: {
                key: Key;
                id: number;
            };
            playable_race: {
                key: Key;
                id: number;
            };
        };
        rank: number;
    }[];
}

export async function fetchGuild(realmSlug: string, nameSlug: string) {
    const requestUrl = await generateRequestUrl(format(GUILD_PATH, { realmSlug, nameSlug }), "profile");
    return callApi<Guild>(requestUrl);
}

export async function fetchGuildAchievements(realmSlug: string, nameSlug: string) {
    const requestUrl = await generateRequestUrl(format(GUILD_ACHIEVEMENTS_PATH, { realmSlug, nameSlug }), "profile");
    return callApi<GuildAchievements>(requestUrl);
}

export async function fetchGuildRoster(realmSlug: string, nameSlug: string) {
    const requestUrl = await generateRequestUrl(format(GUILD_ROSTER_PATH, { realmSlug, nameSlug }), "profile");
    return callApi<GuildRoster>(requestUrl);
}
