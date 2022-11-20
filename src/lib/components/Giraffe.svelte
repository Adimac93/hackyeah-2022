<script lang="ts">
    import Dialog from "./Dialog.svelte";

    let visible = false;

    let dialogOpen = false;
    function displayHelp() {
        // alert("This is help, apparently. Can I go back to eating those delicious leaves now?")
        dialogOpen = !dialogOpen;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="giraffe-box" class:visible>
    <div class="column" on:click={displayHelp}>
        <strong class="heading">Guide</strong>
        <img src="/giraffe.png" alt="Giraffe" title="Guide" class="giraffe" />
    </div>
    <div class="toggler-wrapper" on:click={() => (visible = !visible)}>
        <div class="toggler" />
    </div>
</div>

<Dialog title="Guide" isOpen={dialogOpen} on:dialogClose={() => (dialogOpen = false)}>
    <!-- this is placeholder help -->
    <h2>Basics</h2>
    <p>
        This is a social game, where your goal is to complete tasks and collaborate with others to
        progress.
    </p>
    <nav class="guide-nav">
        <a href="/">Completing daily tasks</a>
        <a href="/">Making use of your resources</a>
        <a href="/">Working with others</a>
    </nav>
    <p>
        <a href="/">About the game</a>
    </p>
</Dialog>

<style lang="scss">
    .giraffe-box {
        background-color: var(--bg-2);
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        padding: 8px;
        border-radius: 0 8px 8px 0;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 8px;

        .column {
            display: flex;
            flex-flow: column nowrap;
        }

        position: absolute;
        left: 0px;
        bottom: calc(24px + 3rem);

        // giraffe image + 1 padding
        transform: translateX(-158px);
        transition: transform 0.3s ease;
    }

    .giraffe {
        display: block;
        height: 200px;
        transform: scaleX(-1);
        cursor: pointer;
    }

    .guide-nav a {
        display: block;
    }

    .toggler-wrapper {
        height: 200px;
        display: grid;
        place-items: center;
        cursor: pointer;
    }

    .toggler {
        width: 1rem;
        height: 2rem;
        background-color: black;
        clip-path: polygon(0 0, 100% 50%, 0 100%);
    }

    .giraffe-box.visible {
        transform: none;
        .toggler {
            transform: scaleX(-1);
        }
    }
</style>
