import type { Item } from "./Item";

export class Inventory {
    items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    hasItem(id: string, count?: number) {
        return this.items.some((invItem) => invItem.id == id && invItem.count > (count ?? 0));
    }
}
