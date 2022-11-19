<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Button from "./Button.svelte";

    export let isOpen: boolean;
    export let useButtons: boolean = true;
    export let title: string;

    let ref: HTMLDivElement;
    let portal: HTMLDivElement;

    const dispatcher = createEventDispatcher();

    function close() {
        dispatcher("dialogClose");
    }

    onMount(() => {
        portal = document.createElement("div");
        portal.className = "portal"
        document.body.appendChild(portal);
        portal.appendChild(ref);
    });

    onDestroy(() => {
        if (portal) document.body.removeChild(portal);
    });
</script>

<div class="portal-clone">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="dialog-wrapper" bind:this={ref}>
        {#if isOpen}
            <div class="backdrop" class:visible={isOpen} on:click={close} transition:fade={{ duration: 300 }}>
                <div role="dialog" class="dialog">
                    <div class="title">
                        <span class="title-text">{title}</span>
                        <button class="close-button" on:click={close}><svg class="close-icon" viewBox="1 1 9 9"><line x1="2" y1="2" x2="8" y2="8" stroke="black"/><line x1="8" y1="2" x2="2" y2="8" stroke="black"/></svg></button></div>
                    <div class="content">
                        <slot/>
                    </div>
                    {#if useButtons}
                        <div class="actions">
                            <slot name="actions"><Button type="primary" on:click={close}>OK</Button></slot>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .backdrop {
        display: none;
        opacity: 0;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.4);

        z-index: 100;
        transition: opacity .3s ease-in;

        &.visible {
            display: block;
            opacity: 1;
        }
    }

    .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        z-index: 101;

        width: max-content;
        height: max-content;
        max-width: 95vw;
        max-height: 95vh;

        background-color: white;
        border-radius: 8px;
        overflow-x: hidden;
        overflow-y: auto;

        .title {
            background-color: var(--primary);
            padding: 12px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            gap: 8px;

            .title-text {
                font-weight: bold;
            }

            .close-button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                padding: 0;
            }

            .close-icon {
                height: 1rem;
                display: block;
            }
        }

        .content {
            margin: 12px;
        }

        .actions {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            margin: 0 12px 12px 12px;
        }
    }
</style>