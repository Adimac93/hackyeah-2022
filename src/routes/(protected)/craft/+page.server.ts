import { db } from "$lib/server/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const recipes = await db.recipe.findMany({
        include: { ingredients: { include: { item: true } }, outputItem: true },
    });

    const returnRecipes = recipes.map((recipe) => {
        return {
            outputItem: {
                name: recipe.outputItem.name,
                icon: recipe.outputItem.icon,
                id: recipe.outputItem.id,
                count: recipe.count,
            },
            ingredients: recipe.ingredients.map((ingredient) => {
                return {
                    name: ingredient.item.name,
                    icon: ingredient.item.icon,
                    id: ingredient.item.id,
                    count: ingredient.count,
                };
            }),
        };
    });

    return returnRecipes;
};
