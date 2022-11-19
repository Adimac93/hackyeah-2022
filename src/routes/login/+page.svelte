<script>
    import Button from "$lib/Button.svelte";
</script>

<form method="POST" class="form">
    <label>E-mail <input name="email" type="email" required /></label>
    <label>Password <input name="password" type="password" required /></label>
    <Button type="primary">Log in</Button>
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
