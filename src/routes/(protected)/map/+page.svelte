<script lang="ts">
    import type { PageData } from "./$types";
    import Point from "./Point.svelte";
    import { selectedPoint } from "./selectedPoint";

    export let data: PageData;

    function hideCard() {
        $selectedPoint = null;
    }

    // in pixels
    let offsetX = 720;
    let offsetY = 368;

    let evCache: PointerEvent[] = [];

    function startDragging(ev: PointerEvent) {
        evCache.push(ev);
        hideCard();
    }

    function handleMove(ev: PointerEvent) {
        const index = evCache.findIndex((cachedEv) => cachedEv.pointerId == ev.pointerId);
        evCache[index] = ev;

        // position
        if (evCache.length > 0) {
            offsetX += ev.movementX;
            offsetY += ev.movementY;
        }
    }

    function stopDragging(ev: PointerEvent) {
        evCache = evCache.filter((cachedEv) => cachedEv.pointerId != ev.pointerId);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container">
    <div class="map"
        on:click={hideCard}
        style:--offsetX="{offsetX}px" style:--offsetY="{offsetY}px"
        on:pointerdown={startDragging}
        on:pointerup={stopDragging}
        on:pointercancel={stopDragging}
    >
        <img src="https://i.imgur.com/PtPjiDQ.png" alt="map" />
        {#each data.districts as point}
            <Point {point} />
        {/each}
    </div>
</div>

<svelte:window on:pointermove={handleMove}/>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: grid;
        place-items: center;
    }

    .map {
        position: relative;
        top: var(--offsetY);
        left: var(--offsetX);
        transform: translate(-50%, -50%);
        width: min-content;
        height: min-content;
        cursor: grab;
    }

    img {
        display: block;
        pointer-events: none;
        touch-action: none;
        height: 100%;
    }
</style>
