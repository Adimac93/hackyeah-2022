<script lang="ts">
    import type { ActionData } from "./$types";
    import Button from "$lib/components/Button.svelte";
    export let form: ActionData;
</script>

<form method="POST" class="form">
    <label>E-mail <input name="email" type="email" required /></label>
    <label>Password <input name="password" type="password" required /></label>
    <Button type="primary">Log in</Button>
    {#if form?.incorrect}
        <div>Incorrect credentials</div>
    {/if}
</form>

<style lang="scss">
    .form {
        display: flex;
        flex-flow: column nowrap;
        gap: 6px;
        width: 40ch;
        margin: auto;

        label {
            display: flex;
            flex-flow: column nowrap;
        }
    }
</style>
