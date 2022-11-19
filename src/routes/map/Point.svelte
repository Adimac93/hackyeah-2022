<script lang="ts">
    import { selectedPoint, type Point } from "./selectedPoint";

    export let point: Point;
</script>

<button on:click|stopPropagation={() => ($selectedPoint = point, console.log($selectedPoint))} style:left="{point.x}px" style:top="{point.y}px">
    <img src="https://i.imgur.com/QSnusCP.png" alt="square" />
</button>

<style>
    button {
        position: absolute;
        margin: 0;
        padding: 0;
        background-color: transparent;
        border: none;
        translate: -50% -50%;
    }
</style>
