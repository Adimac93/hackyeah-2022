<script>
    import Button from "$lib/components/Button.svelte";
    import Dialog from "$lib/components/Dialog.svelte";

    let dialogOpen = false;
</script>

<div class="wrapper">
    <header class="header">
        <div class="header-left">
            <div>❤ 20/20</div>
            <div>💰 4.20</div>
        </div>
        <div class="header-right">
            <div>Some kind of info on the right side idk</div>
        </div>
    </header>
    <Dialog title="test dialog 123" isOpen={dialogOpen} on:dialogClose={() => dialogOpen = false} useButtons={false}>
        test dialog 123
    </Dialog>
    <Button class="menu" type="primary" shape="round" on:click={() => dialogOpen = true}>menu</Button>
</div>

<style lang="scss">
    .wrapper {
        display: block;
        width: 100vw;
        height: 100vh;
        position: relative;
    }

    .header {
        position: absolute;
        top: 0;
        width: calc(100vw - 16px);
        padding: 8px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        gap: 8px;

        font-size: large;
    }

    .header-left {
        min-width: max-content;
    }

    :global(.menu) {
        position: absolute;
        bottom: 8px;
        right: 8px;
    }
</style>
