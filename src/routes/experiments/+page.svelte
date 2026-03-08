<script lang="ts">
    import DashboardExperiment from "$lib/components/DashboardExperiment.svelte";
    import Stone from "$lib/components/Stone.svelte";

    const { data } = $props();
</script>

<svelte:head>
    <title>Experiments | WraithCode</title>
</svelte:head>

<Stone>
    <section class="experiments">
        <header class="experiments-header">
            <h1>The Lab</h1>

            <p>
                From playing with new tools and technologies, to working on a random idea, there's so much cool
                stuff to build! Here's everything I've been experimenting with...
            </p>
        </header>

        <div class="experiments-list">
            {#each data.experiments as experiment, index (experiment.id)}
                <DashboardExperiment {experiment} {index} />
            {/each}
        </div>
    </section>
</Stone>

<style>
    .experiments {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
        width: 100%;
        padding: 1rem;

        & header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0 2rem 1rem;

            & h1 {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 3rem;
            }
        }

        & .experiments-list {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1rem;
        }
    }

    /* @media (max-width: 768px) {
        .experiments {
            & .experiments-list {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    } */
</style>
