<script lang="ts">
    import { tick } from "svelte";
    import { selectedPoint, type Point } from "./selectedPoint";
    import { fade } from "svelte/transition";

    export let point: Point;

    async function selectPoint() {
        $selectedPoint = null;
        await tick();
        $selectedPoint = point;
    }
</script>

<button on:click|stopPropagation={selectPoint} style:left="{point.x}px" style:top="{point.y}px">
    <img src="https://i.imgur.com/QSnusCP.png" alt="square" />
</button>
{#if $selectedPoint == point}
    <div transition:fade={{ duration: 200 }} style:left="{point.x}px" style:top="{point.y}px">
        <h2>{point.title}</h2>
        <p>{point.description}</p>
        <a href="/map/foo">Go there</a>
    </div>
{/if}

<style>
    button {
        position: absolute;
        margin: 0;
        padding: 0;
        background-color: transparent;
        border: none;
        translate: -50% -50%;
    }
    div {
        position: absolute;
        margin: 0;
        padding: 0.5rem;
        background-color: white;
        border: 8px solid black;
        translate: -50% calc(-100% - 1.5rem);
        height: 6rem;
        width: max-content;
    }
    h2 {
        margin: 0.5rem 0;
    }
    p {
        margin: 0;
        width: 100%;
        max-width: 16rem;
    }
</style>
