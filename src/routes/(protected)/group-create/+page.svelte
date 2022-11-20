<script>
    import Button from "$lib/components/Button.svelte";
</script>

<form method="POST" class="form">
    <label>Name <input name="name" type="text" required /></label>
    <Button type="primary">Create group</Button>
</form>
