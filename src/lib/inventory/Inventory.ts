import type { InventoryRecord } from "./Item";

export class Inventory {
    items: InventoryRecord[];

    constructor(items: InventoryRecord[]) {
        this.items = items;
    }

    hasItem(id: string, count?: number) {
        return this.items.some((invItem) => invItem.id == id && invItem.count > (count ?? 0));
    }
}
