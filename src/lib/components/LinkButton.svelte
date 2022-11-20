<script lang="ts">
    export let type: "primary" | "secondary" | "destructive";
    export let shape: "rectangle" | "round" = "rectangle";
    export let href: string;
</script>

<!-- is there a better way to add classes? -->
<a
    class:button={true}
    {href}
    class:primary={type == "primary"}
    class:secondary={type == "secondary"}
    class:destructive={type == "destructive"}
    class:rectangle={shape == "rectangle"}
    class:round={shape == "round"}
    {...$$restProps}
>
    <slot />
</a>

<style lang="scss">
    // TODO: hover animations
    .button {
        padding: 8px 12px;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        text-align: center;

        color: black;
        text-decoration: none;
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
