<script lang="ts">
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";

    const { data } = $props();

    const cssCode = `h1 {
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #10afe4, #d311b9);
}`;
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title={data.experiment.title}>
    <p>
        We can use the <span>background-image</span> CSS property to add a gradient to text.
    </p>
</ExperimentTitle>

<Stone>
    <div class="container">
        <div class="gradient-text h1">Look at this pretty text!</div>

        <div class="code-section">
            <CodeBlock code={cssCode} lang="css" />
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
        padding: 4rem 1rem 1rem;
    }

    .gradient-text {
        /* https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip */
        -webkit-background-clip: text;
        background-clip: text;
        /* https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-fill-color */
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(to right, #10afe4, #d311b9);
    }

    .code-section {
        width: 100%;
        max-width: 40rem;
        margin-top: 4rem;
    }
</style>