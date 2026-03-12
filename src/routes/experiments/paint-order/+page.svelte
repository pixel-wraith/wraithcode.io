<script lang="ts">
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";

    const { data } = $props();

    const e1CSSCode = `h1 { 
    paint-order: normal;
}`;

    const e2CSSCode = `h1 {
    paint-order: stroke fill;
}`;
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title="Paint Order">
    <p>
        We can use the <span>paint-order</span> CSS property to change the order in which the browser paints text onto the page.
    </p>

    <p>
        By default, the browser will draw text in the following order: <em>fill</em>, <em>stroke</em>, <em>markers</em>.
    </p>
</ExperimentTitle>

<Stone>
    <div class="container flex-center">
        <div class="examples-container">
            <div class="example-container">
                <h1 class="e1">Wraithcode</h1>

                <div class="code-section">
                    <CodeBlock code={e1CSSCode} lang="css" />
                </div>

                <p>
                    Uses the default paint order: <em>fill</em>, <em>stroke</em>, <em>markers</em>.
                </p>
            </div>

            <div class="example-container">
                <h1 class="e2">Wraithcode</h1>

                <div class="code-section">
                    <CodeBlock code={e2CSSCode} lang="css" />
                </div>

                <p>
                    Changes the paint order so the stroke is drawn first, then the fill.
                </p>
            </div>
        </div>
    </div>
</Stone>

<style>
    .examples-container {
        display: grid;
        grid-template-columns: 1fr;
        align-items: start;
    }

    .example-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;

        &:not(:last-child) {
            border-bottom: 1px solid var(--neutral-300);
        }
    }

    h1 {
        font-size: 5rem;
        font-weight: 900;
        color: var(--neutral-400);
        line-height: 5rem;
    }

    .e1 {
        paint-order: normal;
        -webkit-text-stroke: 3px var(--accent2-500);
    }

    .e2 {
        paint-order: stroke fill;
        -webkit-text-stroke: 3px var(--accent2-500);
    }
</style>
