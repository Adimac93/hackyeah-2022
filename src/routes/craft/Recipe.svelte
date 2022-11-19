<script lang="ts">
    import InventoryItem from "$lib/inventory/InventoryItem.svelte";
    import type { Recipe } from "$lib/inventory/Recipe";
    import type { Inventory } from "$lib/inventory/Inventory";
    import type { InventoryRecord } from "$lib/inventory/Item";

    export let recipe: Recipe;
    export let inventory: Inventory | undefined = undefined;

    function available(item: InventoryRecord) {
        if (!inventory) return null;
        else return inventory.hasItem(item.id, item.count);
    }
</script>

<div>
    <strong>Result</strong>
    <InventoryItem item={recipe.output} />
</div>
<div class="ingredients">
    <strong>Ingredients</strong>
    <ul class="ingredients-list">
        {#each recipe.ingredients as ingredient}
            <li><InventoryItem item={ingredient} available={available(ingredient)} /></li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .ingredients {
        margin-top: 6px;
    }

    .ingredients-list {
        list-style-type: none;
        display: flex;
        flex-flow: column nowrap;
        gap: 4px;
    }
</style>
