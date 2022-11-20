<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<form method="POST" class="form">
    <input type="hidden" name="type" value="invite" />

    <label>E-mail <input name="email" type="email" required /></label>
    <Button type="primary">Add to group</Button>
</form>

{#each data.users as user}
    <form method="POST" class="form">
        <input type="hidden" name="type" value="kick" />
        <input type="hidden" name="userId" value="{user.user.id}" />

        {user.user.username} ({user.user.email})
        {#if user.isOwner}
            <strong>(you)</strong>
        {:else}
            <Button type="primary">Kick</Button>
        {/if}
    </form>
{/each}

{#each data.pendingInvites as invite}
    <p>{invite.email}</p>
{/each}

<form method="POST" class="form">
    <input type="hidden" name="type" value="delete" />
    <Button type="destructive">Delete group</Button>
</form>
