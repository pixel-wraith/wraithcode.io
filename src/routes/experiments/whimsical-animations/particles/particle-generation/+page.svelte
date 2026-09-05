<script lang="ts">
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";

    let liked = $state(false);

    const onClick = () => {
        liked = !liked;
    };
</script>

<ExperimentHeader links={[]} back={{ text: "Back to Particles", route: "/experiments/whimsical-animations/particles" }} />

<ExperimentTitle title="Particle Generation" />

<Stone>
    <div class="container">
        <button aria-label="Toggle like" onclick={onClick}>
            {#if liked}
                <i class="fa-solid fa-heart"></i>
            {:else}
                <i class="fa-regular fa-heart"></i>
            {/if}
        </button>
    </div>
</Stone>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 25rem;
        padding: 1rem;
    }

    button {
        background: none;
        border: none;
        color: var(--accent1-500);
        cursor: pointer;

        i {
            font-size: 2.5rem;
        }
    }
</style>
