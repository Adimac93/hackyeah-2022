<script lang="ts">;
    import Button from "$lib/components/Button.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#each data.invites as invite}
    <form method="POST" class="form">
        <input type="hidden" name="groupId" value="{invite.group.id}" />

        User <strong>{invite.senderUsername} ({invite.senderEmail})</strong> invites you to group named <strong>{invite.group.name}</strong>
        <Button type="primary">Join</Button>
    </form>
{/each}

<Button type="primary">Create own group</Button>
