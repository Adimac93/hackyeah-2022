<script lang="ts">
    import { getItemData } from "./Item";
    // TODO: make this an enum or something idk
    export let id: string;
    export let count: number = 0;
    $: itemData = getItemData(id);
</script>

<div class="inventory-slot">
    {itemData.icon}
    {itemData.name}
    {#if count}
        <span class="count">&#xd7; {count}</span>
    {/if}
</div>

<style lang="scss">
    .inventory-slot {
        background-color: var(--bg-2);
        padding: 6px 8px;
        width: max-content;
        border-radius: 4px;
    }

    .count {
        color: #5f5f5f;
    }
</style>
