<script lang="ts">
    import InventoryItem from "./InventoryItem.svelte";
    import type { InventoryRecord } from "./Item";

    export let items: InventoryRecord[];
</script>

<div class="inventory">
    {#each items as item}
        <InventoryItem id={item.id} count={item.count} />
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
