import rawData from "../../data/items.json";

export interface Item {
    name: string;
    icon: string;
}

export interface InventoryRecord {
    id: string;
    count: number;
}

const data = rawData as Record<string, Item>;

export function isValidItem(id: string) {
    return id in data;
}

export function getItemData(id: string) {
    if (!isValidItem(id)) {
        throw Error(`Invalid item ID ${id}`);
    }

    return data[id] as Item;
}
