import type { InventoryRecord } from "./Item";
import type { Inventory } from "./Inventory";

export interface Recipe {
    id: string;
    output: InventoryRecord;
    ingredients: InventoryRecord[];
}

export function canCraft(inventory: Inventory, recipe: Recipe) {
    return recipe.ingredients.every((item) => inventory.hasItem(item.id, item.count));
}
