<script lang="ts">
    import InventoryItem from "./InventoryItem.svelte";
    import type { Inventory } from "./Inventory";

    export let inventory: Inventory;
</script>

<div class="inventory">
    {#each inventory.items as item}
        <InventoryItem item={item} />
    {/each}
</div>

<style lang="scss">
    .inventory {
        display: flex;
        gap: 8px;
        flex-flow: row wrap;
        justify-content: center;
    }
</style>
