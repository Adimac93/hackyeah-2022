<script>
    import Button from "$lib/components/Button.svelte";
    import LinkButton from "$lib/components/LinkButton.svelte";
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
    <Dialog title="Menu" isOpen={dialogOpen} on:dialogClose={() => dialogOpen = false} useButtons={false}>
        <div class="links">
            <LinkButton type="secondary" href="/map">Map</LinkButton>
            <LinkButton type="destructive" href="/map">???</LinkButton>
            <LinkButton type="primary" href="/map">Profit</LinkButton>
        </div>
        <div class="divider"></div>
        <div class="bottom-buttons">
            <form method="POST" action="/logout">
                <Button type="destructive" href="/logout">Log out</Button>
            </form>
            <LinkButton type="secondary" href="/settings">Settings</LinkButton>
        </div>
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

    .header-right {
        text-align: right;
    }

    .links {
        display: flex;
        width: 100%;
        flex-flow: column nowrap;
        align-items: center;
        gap: 8px;
    }

    .divider {
        border-bottom: 1px solid black;
        width: 100%;
        margin: 12px 0;
    }

    .bottom-buttons {
        display: flex;
        flex-flow: row wrap;
        gap: 8px;
    }

    :global(.menu) {
        position: absolute;
        bottom: 8px;
        right: 8px;
    }
</style>
