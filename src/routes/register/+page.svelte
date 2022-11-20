<script lang="ts">
    import type { ActionData } from "./$types";
    import Button from "$lib/components/Button.svelte";
    import LinkButton from "$lib/components/LinkButton.svelte";
    export let form: ActionData;
</script>

<div class="global-wrapper">
    <form method="POST" class="form">
        <h1>Register</h1>
        <label>E-mail <input name="email" type="email" required /></label>
        <label>Password <input name="password" type="password" required /></label>
        <label>Repeat password <input name="repeat-password" type="password" required /></label>
        <Button type="primary">Register</Button>
        {#if form?.info}
            <div>{form.info}</div>
        {/if}
        <span>or</span>
        <LinkButton href="/login" type="secondary">Login</LinkButton>
    </form>
</div>

<style lang="scss">
    .global-wrapper {
        width: 100%;
        height: 100vh;
        background: linear-gradient(0.44turn, #fec24f, #fe4999);
        display: grid;
        place-items: center;
    }

    h1 {
        margin: 0;
    }

    .form {
        display: flex;
        flex-flow: column nowrap;
        gap: 6px;
        width: 40ch;
        margin: auto;

        background-color: white;
        border-radius: 8px;
        padding: 8px;

        label {
            display: flex;
            flex-flow: column nowrap;
        }
    }
    span {
        text-align: center;
    }
</style>
