<script lang="ts">
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Input from "$lib/components/Input.svelte";
    import Stone from "$lib/components/Stone.svelte";

    const { data } = $props();

    let columns = $state(4);
    let orphans = $state(2);

    const cssCode = $derived(`div.content {
    columns: ${columns ?? 2};
    orphans: ${orphans ?? 2};
}`);
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title={data.experiment.title}>
    <p>
        We can use the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/orphans">orphans</a> CSS property to control the minimum number of lines that must be left at the bottom of a page or column before a break occurs, helping to improve the readability of text in printed documents or multi-column layouts.
    </p>
</ExperimentTitle>

<Stone>
    <div class="container">
        <div style="padding-bottom: 1rem;">
            <p>Change the number of columns and orphans to see how the text behaves.</p>
        </div>

        <div class="controls">
            <div class="control">
                <Input
                    id="columns"
                    name="columns"
                    bind:value={columns}
                    label="Columns"
                />
            </div>

            <div class="control">
                <Input
                    id="orphans"
                    name="orphans"
                    bind:value={orphans}
                    label="Orphans"
                />
            </div>
        </div>

        <div class="content" style="columns: {columns ?? 2}; orphans: {orphans ?? 2};">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>

        <ul class="content" style="columns: {columns ?? 2}; orphans: {orphans ?? 2};">
            <li>
                Option 1
            </li>
            <li>
                Option 2
            </li>
            <li>
                Option 3
            </li>
            <li>
                Option 4
            </li>
            <li>
                Option 5
            </li>
            <li>
                Option 6
            </li>
            <li>
                Option 7
            </li>
        </ul>

        <div class="code-section">
            <CodeBlock code={cssCode} lang="css" />
        </div>
    </div>
</Stone>

<style>
    .container {
        width: 100%;
        padding: 1rem;
    }

    p a {
        color: var(--primary-500);
        text-decoration: none;
        transition: all 0.25s ease-in-out;

        &:hover {
            color: var(--primary-300);
            transition: all 0.25s ease-in-out;
        }

        &:focus-visible {
            outline: 1px dashed var(--neutral-700);
            outline-offset: calc(var(--outline-offset) - 1px);
        }
    }

    .controls {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
    }

    .control {
        max-width: 10rem;
    }

    .content {
        height: 300px;
        margin-top: 2rem;
        padding: 2rem;
        border: 1px solid var(--neutral-300);
    }

    ul.content {
        height: auto;
    }

    li {
        border: 1px solid var(--neutral-300);
        padding: 0.25rem 0.5rem;
        margin-bottom: 0.5rem;
        list-style-position: inside;
    }

    .code-section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 20rem;
        margin: 4rem auto 0;
    }
</style>