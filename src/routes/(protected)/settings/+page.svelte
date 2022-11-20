<script lang="ts">
    import type { PageData } from "./$types";
    import Button from "$lib/components/Button.svelte";
    import LinkButton from "$lib/components/LinkButton.svelte";

    export let data: PageData;
</script>

<div class="wrapper">
    <img src="/giraffe.png" alt="Giraffe" />
    <h1>{data.username}</h1>
    <p>{data.email}</p>
    <p>Coins: {data.coins}</p>
    <p>Score: {data.score}</p>
    {#if data.isOwner}
        <LinkButton type="primary" href="/admin-panel">Admin Panel</LinkButton>
    {:else}
        <form method="POST" class="form">
            <input type="hidden" name="type" value="leave" />

            <Button type="destructive">Leave the group</Button>
        </form>
    {/if}
    <form method="POST" class="form">
        <input type="hidden" name="type" value="delete" />

        <Button type="destructive">Delete account</Button>
    </form>
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
        display: flex;
        align-items: stretch;
        flex-flow: column nowrap;
        gap: 1rem;
    }
    .wrapper * {
        margin: 0;
    }
</style>
