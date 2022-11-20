<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import LinkButton from "$lib/components/LinkButton.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#if data.isOwner}
    <LinkButton type="primary" href="/admin-panel">Admin Panel</LinkButton>
{:else}
    <Button type="destructive">Leave a group</Button>
{/if}

<Button type="destructive">Delete account</Button>
