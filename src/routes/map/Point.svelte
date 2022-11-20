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

<button on:click|stopPropagation={selectPoint} style:left="{point.x}%" style:top="{point.y}%">
    <img src="https://i.imgur.com/QSnusCP.png" alt="square" />
</button>
{#if $selectedPoint == point}
    <div transition:fade={{ duration: 200 }} style:left="{point.x}%" style:top="{point.y}%" class:tt-top={ point.y >= 50 } class:tt-bottom={ point.y < 50 } class="tooltip">
        <h2>{point.title}</h2>
        <p>{point.description}</p>
        <a href="/map/{point.id}"><img class="arrow" src="https://i.imgur.com/WeYp8NK.png" alt="Go There"></a>
    </div>
{/if}

<style>
    .arrow {
        margin: 10% 0 0 41%;
        width: 3rem;
    }
    button {
        position: absolute;
        margin: 0;
        padding: 0;
        background-color: transparent;
        border: none;
        transform: translate(-50%, -50%);
    }
    .tooltip {
        position: absolute;
        margin: 0;
        padding: 0.5rem;
        background-color: white;
        border: 8px solid black;
        width: max-content;
    }

    .tooltip.tt-top {
        transform: translate(-50%, calc(-100% - 1.5rem));
    }

    .tooltip.tt-bottom {
        transform: translate(-50%, 1.5rem);
    }

    .tooltip h2 {
        margin: 0.5rem 0;
    }
    .tooltip p {
        margin: 0;
        width: 100%;
        max-width: 16rem;
    }
</style>
