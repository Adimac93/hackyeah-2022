<script lang="ts">
    import { selectedPoint } from "./selectedPoint";
    import { fade } from "svelte/transition";
</script>

{#if $selectedPoint}
    <div
        transition:fade={{ duration: 200 }}
        style:left="{$selectedPoint.x}px"
        style:top="{$selectedPoint.y}px"
    >
        <h2>{$selectedPoint.title}</h2>
        <p>{$selectedPoint.description}</p>
        <a href="/map/foo">Go there</a>
    </div>
{/if}

<style>
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
