<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="wrapper">

    <img src="/giraffe.png" alt="Giraffe" />
    <h1>{data.username}</h1>
    <p>{data.email}</p>
    <p>Coins: {data.coins}</p>
    <p>Score: {data.score}</p>
</div>

<style>
    :global(body) {
        background-color: #eee;
    }
    .wrapper {
        margin: 2rem auto;
        padding: 3rem;
        width: fit-content;
        background-color: white;
        border-radius: 1rem;
    }
</style>