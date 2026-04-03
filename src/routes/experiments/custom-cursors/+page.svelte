<script lang="ts">
    import flashlight from "$lib/assets/images/experiments/custom-cursors/flashlight.png";
    import skullAndCrossbones from "$lib/assets/images/experiments/custom-cursors/skull-and-crossbones.png";
    import testTube from "$lib/assets/images/experiments/custom-cursors/test-tube.png";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";

    const { data } = $props();

    let cursor = $state(flashlight);
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title={data.experiment.title}>
    <p>
        We can create custom cursors using CSS and SVG (with a PNG fallback).
    </p>
</ExperimentTitle>

<Stone>
    <div
        class="container"
        style="cursor: url('{cursor}') 8 20, crosshair;"
    >
        <div class="cursor-buttons">
            <button
                onclick={() => cursor = flashlight}
            >
                <img src={flashlight} alt="Flashlight" />
            </button>

            <button
                onclick={() => cursor = skullAndCrossbones}
            >
                <img src={skullAndCrossbones} alt="Skull and Crossbones" />
            </button>

            <button
                onclick={() => cursor = testTube}
            >
                <img src={testTube} alt="Test Tube" />
            </button>
        </div>

        <div class="display-area">
            <!-- left empty intentionally -->
        </div>
    </div>
</Stone>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .cursor-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
        padding: 1rem;

        & button {
            background-color: transparent;
            border: none;
            cursor: pointer;
        }

        & img {
            display: block;
            width: 2rem;
        }
    }

    .display-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 25rem;
        padding: 1rem;
    }
</style>
