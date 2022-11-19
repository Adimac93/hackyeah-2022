<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import Recipe from "./Recipe.svelte";
    import recipes from "../../data/recipes.json";
    import { canCraft } from "$lib/inventory/Recipe";
    import { Inventory } from "$lib/inventory/Inventory";
    import InventoryDisplay from "$lib/inventory/InventoryDisplay.svelte";

    // TODO: get this from the server
    const inventory = new Inventory([
        { id: "donut", count: 2 },
        { id: "cookie", count: 16 },
        { id: "custard", count: 6387 },
    ]);

    // this is kinda inefficient but who cares
    $: craftable = recipes.filter((recipe) => canCraft(inventory, recipe));
    $: uncraftable = recipes.filter((recipe) => !canCraft(inventory, recipe));
</script>

<h1>Crafting</h1>

<h2>Your inventory</h2>
<InventoryDisplay {inventory} />

<h2>Craftable recipes</h2>
<ul class="craftable-recipes">
    {#each craftable as recipe}
        <li class="recipe">
            <Recipe {recipe} />
            <Button type="primary">Craft</Button>
        </li>
    {/each}
</ul>

<h2>Recipes with missing ingredients</h2>
<ul class="uncraftable-recipes">
    {#each uncraftable as recipe}
        <li class="recipe">
            <Recipe {inventory} {recipe} />
            <Button type="primary" disabled>Craft</Button>
        </li>
    {/each}
</ul>

<style lang="scss">
    .recipe {
        display: flex;
        flex-flow: column nowrap;
        gap: 4px;

        :global(button) {
            width: max-content;
        }
    }
</style>
