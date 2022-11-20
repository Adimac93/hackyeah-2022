<script lang="ts">
    export let type: "primary" | "secondary" | "destructive";
    export let shape: "rectangle" | "round" = "rectangle";
</script>

<!-- is there a better way to add classes? -->
<button
    class:button={true}
    on:click
    class:primary={type == "primary"}
    class:secondary={type == "secondary"}
    class:destructive={type == "destructive"}
    class:rectangle={shape == "rectangle"}
    class:round={shape == "round"}
    {...$$restProps}
>
    <slot />
</button>

<style lang="scss">
    // TODO: hover animations
    .button {
        padding: 8px 12px;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        text-align: center;
    }

    .button:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    .rectangle {
        border-radius: 4px;
    }

    .round {
        border-radius: 50%;
        padding: 8px;
        :global(img) {
            display: block;
            width: 1rem;
            height: 1rem;
        }
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
