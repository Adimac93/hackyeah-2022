<script type="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

{#each data.trades as trade}{/each}
