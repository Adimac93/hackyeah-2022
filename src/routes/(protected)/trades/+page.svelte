<script type="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

{#each data.trades as trade}
    <form method="POST">
        <input name="trade_id" value={trade.id} hidden />
        <h2>{trade.username}</h2>
        <button>Buy this offer</button>
    </form>
{:else}
    <h1>There are no trade offers yet. <a href="/trades/post">Post your own</a></h1>
{/each}
