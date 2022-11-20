<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    let items: [string, number][] = [];

    function add(id: string) {
        const e = items.find((e) => e[0] === id);
        if (e) {
            e[1]++;
        } else {
            items.push([id, 1]);
        }
    }

    function remove(id: string) {
        const e = items.find((e) => e[0] === id);
        if (e) {
            e[1]--;
            items = items.filter((e) => e[1] > 0);
        }
    }
</script>

{#each data.items as item}
    <li>
        <h1>{item.type.name}</h1>
        <p>Cost: {item.type.cost} coins</p>
        <p>Amount: {item.count}</p>
        <button on:click={() => add(item.type.id)}>Add</button>
        <button on:click={() => remove(item.type.id)}>Remove</button>
    </li>
{:else}
    <h1>You don't have any items.</h1>
{/each}
<form method="POST">
    {#each items as [id, count]}
        <input name={id} value={count} hidden />
    {/each}
    <p>{items.length} items</p>
    <label for="cost">Your price:</label>
    <input type="number" id="cost" name="cost" value="0" />
    <button disabled={items.length === 0}>Confirm your offer</button>
</form>
