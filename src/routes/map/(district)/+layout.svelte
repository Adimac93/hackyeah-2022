<script>
    import Button from "$lib/components/Button.svelte";
    import LinkButton from "$lib/components/LinkButton.svelte";
    import Dialog from "$lib/components/Dialog.svelte";

    let dialogOpen = false;
    let healthPercent = 0.69;
</script>

<div class="wrapper">
    <header class="header">
        <div class="header-left">
            <div>❤ <div class="health-bar" style:--fullness={healthPercent}><div class="health-bar-fill"></div></div></div>
            <div>💰 4.20</div>
        </div>
        <div class="header-right">
            <div>Some kind of info on the right side idk</div>
        </div>
    </header>
    <slot/>
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
    <!-- <Button class="menu" type="primary" shape="round" on:click={() => dialogOpen = true}><img src="/menu_icon.png" alt="Menu"></Button> -->
    <button class="menu-button" on:click={() => dialogOpen = true}>
        <img src="/menu_icon.png" alt="menu">
    </button>
</div>

<svelte:window on:keyup={(ev) => { if (ev.code == "Escape") dialogOpen = !dialogOpen }}/>

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

    .health-bar {
        display: inline-block;
        width: 100px;
        height: 1rem;
        border: 2px solid black;
    }

    .health-bar-fill {
        background-color: red;
        width: calc(100% * var(--fullness));
        height: 100%;
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

    .menu-button {
        position: absolute;
        bottom: 8px;
        right: 8px;
        display: block;
        background: transparent;
        border: none;
        cursor: pointer;
        img {
            height: 4rem;
        }
    }
</style>
