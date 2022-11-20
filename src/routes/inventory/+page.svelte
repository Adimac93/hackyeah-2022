<script lang="ts">
    import InventoryDisplay from "$lib/inventory/InventoryDisplay.svelte";
    import { Inventory } from "$lib/inventory/Inventory";
    import type { PageData } from "./$types";

    export let data: PageData;
    const inventory = new Inventory(data.data);
</script>

<InventoryDisplay inventory={inventory} />
