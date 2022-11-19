<script>
    import InventoryDisplay from "$lib/inventory/InventoryDisplay.svelte";
    import { Inventory } from "$lib/inventory/Inventory";

    // TODO: fetch inventory data from server
    const data = new Inventory([
        { id: "donut", count: 2 },
        { id: "cookie", count: 16 },
        { id: "custard", count: 6387 },
    ]);
</script>

<InventoryDisplay inventory={data} />
