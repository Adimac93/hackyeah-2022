<script lang="ts">
    export let type: "primary" | "secondary" | "destructive";
</script>

<!-- is there a better way to add classes? -->
<button
    class="button"
    on:click
    class:primary={type == "primary"}
    class:secondary={type == "secondary"}
    class:destructive={type == "destructive"}
>
    <slot />
</button>

<style lang="scss">
    // TODO: hover animations
    .button {
        padding: 8px 12px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-family: inherit;
    }

    .primary {
        background-color: lightgreen;
    }

    .secondary {
        background-color: lightgray;
    }

    .destructive {
        background-color: tomato;
    }
</style>
