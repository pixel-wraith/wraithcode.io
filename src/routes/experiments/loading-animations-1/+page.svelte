<script lang="ts">
    import type { Theme } from "$lib/types/props.js";

    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import TextInput from "$lib/components/Input.svelte";
    import LoaderBar1 from "$lib/components/loaders/LoaderBar1.svelte";
    import Select from "$lib/components/Select.svelte";
    import Stone from "$lib/components/Stone.svelte";

    import type { PageData } from "./$types.js";

    interface ILoadingAnimations1Props {
        data: PageData;
    }

    const { data }: ILoadingAnimations1Props = $props();

    let size = $state("medium");
    let speed = $state(300);
    let theme = $state<Theme>("accent2");
    let pattern = $state<'sequential' | 'random'>('sequential');

    const handlePatternChange = (event: Event) => {
        pattern = (event.target as HTMLSelectElement).value as typeof pattern;
    }

    const handleSizeChange = (event: Event) => {
        size = (event.target as HTMLSelectElement).value;
    }

    const handleSpeedChange = (event: Event) => {
        speed = Number.parseInt((event.target as HTMLInputElement).value);

        if (Number.isNaN(speed)) {
            speed = 300;
        }
    }

    const handleThemeChange = (event: Event) => {
        theme = (event.target as HTMLSelectElement).value as Theme;
    }
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title={data.experiment.title}>
    <p>
        I don't know what it is about loading animations, but for some reason I've always found them to be fun to play around with.
    </p>
</ExperimentTitle>

<Stone>
    <div class="container">
        <div class="loaders">
            <div class="loader-group">
                <LoaderBar1
                    id="loader-1"
                    {size}
                    {theme}
                    {speed}
                    {pattern}
                />
            </div>
        </div>

        <div class="controls">
            <Select
                id="size"
                name="size"
                label="Size"
                value={size}
                options={[
                    { value: "small", label: "Small" },
                    { value: "medium", label: "Medium" },
                    { value: "large", label: "Large" },
                ]}
                onchange={handleSizeChange}
            />

            <Select
                id="theme"
                name="theme"
                label="Theme"
                value={theme}
                options={[
                    { value: "primary", label: "Primary" },
                    { value: "accent1", label: "Accent 1" },
                    { value: "accent2", label: "Accent 2" },
                    { value: "neutral", label: "Neutral" },
                    { value: "success", label: "Success" },
                    { value: "danger", label: "Danger" },
                ]}
                onchange={handleThemeChange}
            />

            <Select
                id="pattern"
                name="pattern"
                label="Pattern"
                value={pattern}
                options={[
                    { value: "sequential", label: "Sequential" },
                    { value: "random", label: "Random" },
                ]}
                onchange={handlePatternChange}
            />

            <TextInput
                id="speed"
                name="speed"
                value={speed}
                label="Speed"
                text="Enter the speed of the loader animation in milliseconds."
                type="number"
                onchange={handleSpeedChange}
            />
        </div>
    </div>
</Stone>

<style>
    .container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        height: 100%;
        margin: 0 auto;
        padding: 0.5rem;

        @media (min-width: 768px) {
            grid-template-columns: 1fr 2fr;
        }
    }

    .controls {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        max-width: 30rem;
        margin: 0 auto;
    }

    .loaders {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        height: 100%;
        padding: 2rem 0;

        @media (min-width: 768px) {
            padding: 0;
        }
    }

    .loader-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 30rem;
        height: 100%;
        margin: 0 auto;
    }
</style>