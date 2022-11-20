<script type="ts">
    import type { LayoutData } from "./$types";
    import Button from "$lib/components/Button.svelte";
    import LinkButton from "$lib/components/LinkButton.svelte";
    import Dialog from "$lib/components/Dialog.svelte";
    import { goto } from "$app/navigation";
    import type { FullTask } from "$lib/task";
    import { tasks as taskTypes } from "$lib/task";
    import Giraffe from "$lib/components/Giraffe.svelte";

    export let data: LayoutData;
    let tasks: FullTask[] = data.tasks;
    console.log(data);

    async function claimTask(taskID: string, taskName: string) {
        // ask the backend to complete the task
        await fetch("/api/complete-task", {
            method: "POST",
            body: JSON.stringify({id: taskID, name: taskName}),
            headers: {
                "content-type": "application/json"
            }
        });
        tasks.splice(tasks.findIndex((el) => el.id == taskID), 1);
        // @ts-ignore
        data.coins += taskTypes[taskName].reward.coins;
        tasks = tasks;
    }

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
            <div class="health">
                <img src="/city_health.png" alt="❤ ">
                <div class="health-bar" style:--fullness={healthPercent}>
                    <div class="health-bar-fill" />
                </div>
            </div>
            <div class="money"><img src="/founds.png" alt="Money"><span>{data.coins}</span></div>
            {#each tasks as task}
                <Button type="primary" on:click={() => claimTask(task.id, task.name)}>Claim task {task.name}</Button>
            {/each}
        </div>
        <div class="header-right">
            <div>Next event in: N/A</div>
        </div>
    </header>
    <Dialog
        title="Menu"
        isOpen={dialogOpen}
        on:dialogClose={() => (dialogOpen = false)}
        useButtons={false}
    >
        <div class="links">
            <LinkButton type="secondary" href="/inventory">Inventory</LinkButton>
            <LinkButton type="primary" href="/map">Map</LinkButton>
        </div>
        <div class="divider" />
        <div class="bottom-buttons">
            <form method="POST" action="/logout">
                <Button type="destructive">Log out</Button>
            </form>
            <LinkButton type="secondary" href="/settings">Settings</LinkButton>
        </div>
    </Dialog>

    <Giraffe />
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
        background-color: var(--bg-2);
        padding: 6px;
        border-radius: 8px;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
    }

    .header-right {
        text-align: right;
        div {
            font-size: 2rem;
            background-color: var(--bg-2);
            padding: 6px;
            border-radius: 8px;
            box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        }
    }

    .health {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 4px;
        img {
            height: 2rem;
            display: block;
        }
    }

    .health-bar {
        display: inline-block;
        width: 150px;
        height: 1.25rem;
        border: 2px solid black;
    }

    .health-bar-fill {
        background-color: red;
        width: calc(100% * var(--fullness));
        height: 100%;
    }

    .money {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        img {
            height: 2rem;
            display: block;
        }

        span {
            font-size: 2rem;
        }
    }

    .links {
        display: flex;
        width: 100%;
        flex-flow: column nowrap;
        align-items: center;
        gap: 8px;

        :global(.button) {
            width: 100%;
        }
    }

    .divider {
        border-bottom: 1px solid black;
        width: 100%;
        margin: 12px 0;
    }

    .bottom-buttons {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        gap: 8px;
        :global(*) {
            flex-grow: 1;
        }
        :global(form .button) {
            width: 100%;
        }
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
