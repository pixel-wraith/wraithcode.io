<script lang="ts">
    import DashboardExperiment from "$lib/components/DashboardExperiment.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";

    import type { PageData } from "./$types";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();

    const latestExperiment = $derived(data.experiments[0]);
    const recentExperiments = $derived(data.experiments.slice(1));
</script>

<ExperimentHeader links={[]} back={{ text: "Back to Whimsical Animations", route: "/experiments/whimsical-animations" }} />

<ExperimentTitle title="Particles" />

<Stone>
    <div class="container">
        <DashboardExperiment experiment={latestExperiment} index={0} />

        <div class="container-inner">
            {#each recentExperiments as experiment, index (experiment.id)}
                <DashboardExperiment {experiment} index={index + 1} />
            {/each}
        </div>
    </div>
</Stone>

<style>
    .container {
        position: relative;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
        width: 100%;
        padding: 1rem;
        overflow: hidden;

        & .container-inner {
            position: relative;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            z-index: 1;
        }
    }
</style>
