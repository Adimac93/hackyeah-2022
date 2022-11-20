<script type="ts">
    import type { LayoutData } from "./$types";
    import Button from "$lib/components/Button.svelte";
    import LinkButton from "$lib/components/LinkButton.svelte";
    import Dialog from "$lib/components/Dialog.svelte";
    import { goto } from "$app/navigation";

    export let data: LayoutData;

    let dialogOpen = false;
    let healthPercent = 0.69;

    function handleEscape(ev: KeyboardEvent) {
        if (ev.code == "Escape") dialogOpen = !dialogOpen;
    }
</script>

<div class="wrapper">
    <slot />
    <header class="header">
        <div class="header-left">
            <div>
                <img style="width: 1rem" src="/city_health.png" alt="❤ ">
                <div class="health-bar" style:--fullness={healthPercent}>
                    <div class="health-bar-fill" />
                </div>
            </div>
            <div><img  style="width: 1rem; margin-top: 5px" src="/founds.png" alt="💰"> {data.coins}</div>
        </div>
        <div class="header-right">
            <div>Time until end of event</div>
        </div>
    </header>
    <Dialog
        title="Menu"
        isOpen={dialogOpen}
        on:dialogClose={() => (dialogOpen = false)}
        useButtons={false}
    >
        <div class="links">
            <LinkButton type="secondary" href="/map">Map</LinkButton>
            <LinkButton type="destructive" href="/map">???</LinkButton>
            <LinkButton type="primary" href="/map">Profit</LinkButton>
        </div>
        <div class="divider" />
        <div class="bottom-buttons">
            <form method="POST" action="/logout">
                <Button type="destructive">Log out</Button>
            </form>
            <LinkButton type="secondary" href="/settings">Settings</LinkButton>
        </div>
    </Dialog>
    <!-- <Button class="menu" type="primary" shape="round" on:click={() => dialogOpen = true}><img src="/menu_icon.png" alt="Menu"></Button> -->
    <button class="menu-button" on:click={() => (dialogOpen = true)}>
        <img src="/menu_icon.png" alt="Menu" />
    </button>

    <button class="map-button" on:click={() => goto("/map")}>
        <img src="https://i.imgur.com/GRq3qYo.png" alt="Map" />
    </button>
</div>

<svelte:window on:keyup={handleEscape} />

<style lang="scss">
    .wrapper {
        display: block;
        width: 100vw;
        height: 100vh;
        position: relative;
    }

    .header {
        position: fixed;
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

    .menu-button, .map-button {
        position: fixed;
        display: block;
        background: transparent;
        border: none;
        cursor: pointer;
        img {
            height: 3rem;
        }
    }

    .menu-button {
        bottom: 8px;
        right: 8px;
    }

    .map-button {
        bottom: 8px;
        left: 8px;
    }
</style>
