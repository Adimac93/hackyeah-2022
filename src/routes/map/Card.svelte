<script lang="ts">
    import { selectedPoint } from "./selectedPoint";
</script>

{#if $selectedPoint}
    <div style:left="{$selectedPoint.x}px" style:top="{$selectedPoint.y}px">
        <h2>{$selectedPoint.title}</h2>
        <p>{$selectedPoint.description}</p>
    </div>
{/if}

<style>
    div {
        position: absolute;
        margin: 0;
        padding: 0.5rem;
        background-color: white;
        border: 8px solid black;
        translate: -50% calc(-100% - 1.5);
    }
</style>
