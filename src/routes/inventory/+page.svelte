<script>
    import Inventory from "$lib/inventory/Inventory.svelte";

    // TODO: fetch inventory data from server
    const data = [
        { id: "donut", count: 2 },
        { id: "cookie", count: 16 },
        { id: "custard", count: 6387 },
    ];
</script>

<Inventory items={data} />
