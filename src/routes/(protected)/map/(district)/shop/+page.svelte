<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#each data.offers as offer}
    <form method="POST" class="form">
        <input type="hidden" name="shopOfferId" value={offer.id} />

        <input type="number" name="shopOfferCount" value="1" />

        <img src="{offer.type.icon}" alt="{offer.type.name}" />
        {offer.count} * {offer.type.name} for {offer.cost}
        <Button type="primary">Buy</Button>
    </form>
{/each}
