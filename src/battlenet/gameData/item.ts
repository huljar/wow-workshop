import { ApiResponse, Key, ShortEntry, TypedName, Asset, generateRequestUrl, callApi, format } from "../utils";

const ITEM_CLASSES_INDEX_PATH = "/data/wow/item-class/index";
const ITEM_CLASS_PATH = "/data/wow/item-class/{itemClassId}";
const ITEM_SUBCLASS_PATH = "/data/wow/item-class/{itemClassId}/item-subclass/{itemSubclassId}";
const ITEM_PATH = "/data/wow/item/{itemId} ";
const ITEM_MEDIA_PATH = "/data/wow/media/item/{itemId}";

export interface ItemShort {
    id: number;
    slot: TypedName;
    enchant: number;
    item_appearance_modifier_id: number;
    internal_slot_id: number;
    subclass: number;
}

/**
 * Interface for API call: Game Data → Item → Item Classes Index
 */
export interface ItemClassesIndex extends ApiResponse {
    item_classes: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Item → Item Class
 */
export interface ItemClass extends ApiResponse {
    class_id: number;
    name: string;
    item_subclasses: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Item → Item Subclass
 */
export interface ItemSubclass extends ApiResponse {
    class_id: number;
    subclass_id: number;
    display_name: string;
    verbose_name?: string;
    hide_subclass_in_tooltips?: true;
}

/**
 * Interface for API call: Game Data → Item → Item
 */
export interface Item extends ApiResponse {
    id: number;
    name: string;
    quality: TypedName;
    level: number;
    required_level: number;
    media: {
        key: Key;
        id: number;
    };
    item_class: ShortEntry;
    item_subclass: ShortEntry;
    inventory_type: TypedName;
    purchase_price: number;
    sell_price: number;
    max_count: number;
    is_equippable: boolean;
    is_stackable: boolean;
}

/**
 * Interface for API call: Game Data → Item → Item Media
 */
export interface ItemMedia extends ApiResponse {
    assets: Asset[];
}

/**
 * Fetches an index of item classes.
 *
 * @return  Promise that resolves to the item classes index
 */
export async function fetchItemClassesIndex() {
    const requestUrl = await generateRequestUrl(ITEM_CLASSES_INDEX_PATH, "static");
    return callApi<ItemClassesIndex>(requestUrl);
}

/**
 * Fetches detailed information about an item class.
 *
 * @param  itemClassId  The item class identifier
 * @return  Promise that resolves to the item class information
 */
export async function fetchItemClass(itemClassId: number) {
    const requestUrl = await generateRequestUrl(format(ITEM_CLASS_PATH, { itemClassId }), "static");
    return callApi<ItemClass>(requestUrl);
}

/**
 * Fetches detailed information about an item subclass.
 *
 * @param  itemClassId     The item class identifier
 * @param  itemSubclassId  The item subclass identifier
 * @return  Promise that resolves to the item subclass information
 */
export async function fetchItemSubclass(itemClassId: number, itemSubclassId: number) {
    const requestUrl = await generateRequestUrl(format(ITEM_SUBCLASS_PATH, { itemClassId, itemSubclassId }), "static");
    return callApi<ItemSubclass>(requestUrl);
}

/**
 * Fetches detailed information about an item.
 *
 * @param  itemId  The item identifier
 * @return  Promise that resolves to the item information
 */
export async function fetchItem(itemId: number) {
    const requestUrl = await generateRequestUrl(format(ITEM_PATH, { itemId }), "static");
    return callApi<Item>(requestUrl);
}

/**
 * Fetches media corresponding to the given item.
 *
 * @param  itemId  The item identifier
 * @return  Promise that resolves to the item media
 */
export async function fetchItemMedia(itemId: number) {
    const requestUrl = await generateRequestUrl(format(ITEM_MEDIA_PATH, { itemId }), "static");
    return callApi<ItemMedia>(requestUrl);
}
