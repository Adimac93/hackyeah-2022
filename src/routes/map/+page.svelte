<script lang="ts">
    import type { PageData } from "./$types";
    import Point from "./Point.svelte";
    import { selectedPoint } from "./selectedPoint";

    export let data: PageData;

    function hideCard() {
        $selectedPoint = null;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="map" on:click={hideCard}>
    <img src="https://i.imgur.com/PtPjiDQ.png" alt="map" />
    {#each data.districts as point}
        <Point {point} />
    {/each}
</div>

<style>
    .map {
        position: relative;
    }
    img {
        display: block;
    }
</style>
