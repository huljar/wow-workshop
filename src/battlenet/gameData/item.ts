import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const ITEM_CLASSES_INDEX_PATH = "/data/wow/item-class/index";
const ITEM_CLASS_PATH = "/data/wow/item-class/{itemClassId}";
const ITEM_SUBCLASS_PATH = "/data/wow/item-class/{itemClassId}/item-subclass/{itemSubclassId}";
const ITEM_PATH = "/data/wow/item/{itemId} ";
const ITEM_MEDIA_PATH = "/data/wow/media/item/{itemId}";

interface ItemClassShort {
    key: Key;
    name: string;
    id: number;
}

interface ItemSubclassShort {
    key: Key;
    name: string;
    id: number;
}

export interface ItemShort {
    id: number;
    slot: {
        type: string;
        name: string;
    };
    enchant: number;
    item_appearance_modifier_id: number;
    internal_slot_id: number;
    subclass: number;
}

export interface ItemClassesIndex extends ApiResponse {
    item_classes: ItemClassShort[];
}

export interface ItemClass extends ApiResponse {
    class_id: number;
    name: string;
    item_subclasses: ItemSubclassShort[];
}

export interface ItemSubclass extends ApiResponse {
    class_id: number;
    subclass_id: number;
    display_name: string;
    verbose_name?: string;
    hide_subclass_in_tooltips?: true;
}

export interface Item extends ApiResponse {
    id: number;
    name: string;
    quality: {
        type: string;
        name: string;
    };
    level: number;
    required_level: number;
    media: {
        key: Key;
        id: number;
    };
    item_class: ItemClassShort;
    item_subclass: ItemSubclassShort;
    inventory_type: {
        type: string;
        name: string;
    };
    purchase_price: number;
    sell_price: number;
    max_count: number;
    is_equippable: boolean;
    is_stackable: boolean;
}

export interface ItemMedia extends ApiResponse {
    assets: {
        key: string;
        value: string;
    }[];
}

export async function fetchItemClassesIndex() {
    const requestUrl = await generateRequestUrl(ITEM_CLASSES_INDEX_PATH, "static");
    return callApi<ItemClassesIndex>(requestUrl);
}

export async function fetchItemClass(itemClassId: number) {
    const requestUrl = await generateRequestUrl(format(ITEM_CLASS_PATH, { itemClassId }), "static");
    return callApi<ItemClass>(requestUrl);
}

export async function fetchItemSubclass(itemClassId: number, itemSubclassId: number) {
    const requestUrl = await generateRequestUrl(format(ITEM_SUBCLASS_PATH, { itemClassId, itemSubclassId }), "static");
    return callApi<ItemSubclass>(requestUrl);
}

export async function fetchItem(itemId: number) {
    const requestUrl = await generateRequestUrl(format(ITEM_PATH, { itemId }), "static");
    return callApi<Item>(requestUrl);
}

export async function fetchItemMedia(itemId: number) {
    const requestUrl = await generateRequestUrl(format(ITEM_MEDIA_PATH, { itemId }), "static");
    return callApi<ItemMedia>(requestUrl);
}
