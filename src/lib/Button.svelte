<!-- is there a better way to add classes? -->
<button class="button" on:click class:primary="{type == 'primary'}" class:secondary="{type == 'secondary'}" class:destructive="{type == 'destructive'}">
    <slot/>
</button>

<script lang="ts">
    export let type: "primary" | "secondary" | "destructive"
</script>

<style lang="scss">
    // TODO: hover animations
    .button {
        padding: 4px 8px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }

    .primary {
        background-color: lightgreen;
    }
</style>