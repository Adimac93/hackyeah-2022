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
    let scale = 1.0;

    let dragging = false;
    let mousePos: { x: number, y: number } | null = null;
    let offsetStart: { x: number, y: number } = { x: offsetX, y: offsetY }
    let scaleStart = scale;
    let scaleDistStart: number | null = null;
    let dragStart: { x: number, y: number } | null = null;

    function startDragging(ev: MouseEvent | TouchEvent) {
        // @ts-ignore
        const mousePos = ev.touches ? { x: ev.touches[0].clientX, y: ev.touches[0].clientY } : { x: ev.clientX, y: ev.clientY };
        dragStart = mousePos;
        offsetStart = { x: offsetX, y: offsetY };
        scaleStart = scale;
        dragging = true;

        hideCard();
    }

    function stopDragging() {
        dragging = false;
    }

    function handleMove(pos: {x: number, y: number}) {
        mousePos = { x: pos.x, y: pos.y };
        if (dragging && dragStart) {
            const dx = mousePos.x - dragStart.x;
            const dy = mousePos.y - dragStart.y;
            offsetX = offsetStart.x + dx;
            offsetY = offsetStart.y + dy;
        }
    }

    function handleMouseMove(ev: MouseEvent) {
        handleMove({x: ev.clientX, y: ev.clientY });
    }

    function handleTouchMove(ev: TouchEvent) {
        handleMove({ x: ev.touches[0].clientX, y: ev.touches[0].clientY });
        if (ev.touches.length > 1) {
            // we're pinching!
            if (scaleDistStart == null) {
                // this is the start of a pinch
                scaleDistStart = Math.sqrt((ev.touches[0].clientX - ev.touches[1].clientX)**2 + (ev.touches[0].clientY - ev.touches[1].clientY)**2);
            }
            scale = scaleStart * (Math.sqrt((ev.touches[0].clientX - ev.touches[1].clientX)**2 + (ev.touches[0].clientY - ev.touches[1].clientY)**2) / scaleDistStart)
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container">
    <div class="map"
        on:click={hideCard}
        style:--offsetX="{offsetX}px" style:--offsetY="{offsetY}px"
        on:mousedown={startDragging} on:touchstart|preventDefault={startDragging}
        on:mouseup={stopDragging} on:touchend|preventDefault={stopDragging} on:touchcancel|preventDefault={stopDragging}>
        <img src="https://i.imgur.com/PtPjiDQ.png" alt="map" />
        {#each data.districts as point}
            <Point {point} />
        {/each}
    </div>
</div>

<svelte:window on:mousemove={handleMouseMove} on:touchmove={handleTouchMove}/>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .map {
        position: relative;
        top: var(--offsetY);
        left: var(--offsetX);
        transform: translate(-50%, -50%);
        width: min-content;
        height: min-content;
    }

    img {
        display: block;
        pointer-events: none;
        touch-action: none;
        height: 100%;
    }
</style>
