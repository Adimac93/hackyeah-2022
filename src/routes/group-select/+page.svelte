<script lang="ts">;
    import Button from "$lib/components/Button.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#each data.invites as invite}
    <div>
        User <strong>{invite.senderUsername} ({invite.senderEmail})</strong> invites you to group named <strong>{invite.group.name}</strong>
    </div>
{/each}

<Button type="primary">Create own group</Button>
