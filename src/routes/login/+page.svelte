<script lang="ts">
    import type { ActionData } from "./$types";
    import Button from "$lib/components/Button.svelte";
    import LinkButton from "$lib/components/LinkButton.svelte";
    export let form: ActionData;
</script>

<div class="global-wrapper">
    <form method="POST" class="form">
        <h1>Log in</h1>
        <label>E-mail <input name="email" type="email" required /></label>
        <label>Password <input name="password" type="password" required /></label>
        <Button type="primary">Log in</Button>
        {#if form?.incorrect}
            <div>Incorrect credentials</div>
        {/if}
        <span>or</span>
        <LinkButton href="/register" type="secondary">Register</LinkButton>
    </form>
</div>

<style lang="scss">
    .global-wrapper {
        width: 100%;
        height: 100vh;
        background: linear-gradient(
            0.17turn,
            rgba(59, 129, 136, 1) 26%,
            rgba(9, 121, 98, 1) 49%,
            rgba(7, 136, 125, 1) 67%,
            rgba(0, 212, 255, 1) 100%
        );
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
