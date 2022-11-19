<script>
    import InventoryDisplay from "$lib/inventory/InventoryDisplay.svelte";
    import { Inventory } from "$lib/inventory/Inventory";

    // TODO: fetch inventory data from server
    const data = new Inventory([]);
</script>

<InventoryDisplay inventory={data} />
