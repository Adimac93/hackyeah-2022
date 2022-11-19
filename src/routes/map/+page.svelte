<script lang="ts">
    import Card from "./Card.svelte";
    import Point from "./Point.svelte";
    import { selectedPoint } from "./selectedPoint";

    const points = [
        {
            x: 200,
            y: 200,
            title: "Title",
            description: "Lorem ipsum dolor, sit amet qhdnq. Gieancoa cub veions deak.",
        },
        {
            x: 500,
            y: 100,
            title: "Title",
            description: "Lorem ipsum dolor, sit amet qhdnq. Gieancoa cub veions deak.",
        },
        {
            x: 450,
            y: 230,
            title: "Title",
            description: "Lorem ipsum dolor, sit amet qhdnq. Gieancoa cub veions deak.",
        },
        {
            x: 800,
            y: 300,
            title: "Title",
            description: "Lorem ipsum dolor, sit amet qhdnq. Gieancoa cub veions deak.",
        },
        {
            x: 1200,
            y: 300,
            title: "Title",
            description: "Lorem ipsum dolor, sit amet qhdnq. Gieancoa cub veions deak.",
        },
        {
            x: 900,
            y: 550,
            title: "Title",
            description: "Lorem ipsum dolor, sit amet qhdnq. Gieancoa cub veions deak.",
        },
        {
            x: 450,
            y: 500,
            title: "Title",
            description: "Lorem ipsum dolor, sit amet qhdnq. Gieancoa cub veions deak.",
        },
        {
            x: 150,
            y: 500,
            title: "Title",
            description: "Lorem ipsum dolor, sit amet qhdnq. Gieancoa cub veions deak.",
        },
    ];
</script>

<div class="map" on:click={() => ($selectedPoint = null)}>
    <img src="https://i.imgur.com/PtPjiDQ.png" alt="map" />
    {#each points as point}
        <Point {point} />
    {/each}
    <Card />
</div>

<style>
    .map {
        position: relative;
    }
    img {
        display: block;
    }
</style>
