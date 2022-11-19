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
    { ...$$restProps }
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
        font-size: inherit;
    }

    .button:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    .primary {
        background-color: var(--primary);
    }

    .secondary {
        background-color: var(--secondary);
    }

    .destructive {
        background-color: var(--destructive);
    }
</style>
