<script>
    import Button from "$lib/components/Button.svelte";
</script>

<form method="POST" class="form">
    <label>E-mail <input name="email" type="email" required /></label>
    <Button type="primary">Add to group</Button>
</form>
