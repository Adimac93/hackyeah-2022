<script lang="ts">
    import { getItemData } from "./Item";
    import type { InventoryRecord } from "./Item";

    export let item: InventoryRecord;
    export let available: boolean | null = null;
    $: itemData = getItemData(item.id);
</script>

<div class="inventory-slot">
    {#if available != null}
        <div class="status" class:green={available} class:red={!available}></div>
    {/if}
    <div class="wrapper">
        {itemData.icon}
        {itemData.name}
        {#if item.count != 0}
            <span class="count">&#xd7; {item.count}</span>
        {/if}
    </div>
</div>

<style lang="scss">
    .inventory-slot {
        background-color: var(--bg-2);
        border-radius: 4px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        width: max-content;

        overflow: hidden;
    }

    .wrapper {
        padding: 6px 8px;
    }

    .status {
        width: 6px;
        height: calc(1rem + 20px);
        &.green {
            background-color: rgb(5, 205, 5);
        }

        &.red {
            background-color: red;
        }
    }

    .count {
        color: #5f5f5f;
    }
</style>
