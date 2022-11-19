import type { Item } from "./Item";
import type { Inventory } from "./Inventory";

export interface Recipe {
    id: string;
    output: Item;
    ingredients: Item[];
}

export function canCraft(inventory: Inventory, recipe: Recipe) {
    return recipe.ingredients.every((item) => inventory.hasItem(item.id, item.count));
}
