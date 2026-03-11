<script lang="ts">
    import { codeToHtml } from "shiki";
    import { onMount } from "svelte";

    interface ICodeBlockProps {
        code: string;
        lang?: string;
    }

    const { code, lang = "css" }: ICodeBlockProps = $props();

    let html = $state("");

    onMount(async () => {
        html = await codeToHtml(code, {
            lang,
            theme: "github-dark-default",
        });
    });
</script>

<div class="code-block">
    {#if html}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html html}
    {:else}
        <pre><code>{code}</code></pre>
    {/if}
</div>

<style>
    .code-block {
        width: 100%;
        border-radius: 0.5rem;
        overflow: hidden;
        font-size: 0.9rem;
        line-height: 1.6;

        & :global(pre) {
            width: 100%;
            margin: 0;
            padding: 1.25rem 1.5rem;
            overflow-x: auto;
            border-radius: 0.5rem;
            border: 1px solid var(--neutral-300);
        }

        & :global(code) {
            font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace;
            font-size: 0.85rem;
            line-height: 1.7;
        }

        & pre {
            margin: 0;
            padding: 1.25rem 1.5rem;
            background-color: var(--neutral-50);
            border: 1px solid var(--neutral-300);
            border-radius: 0.5rem;
            overflow-x: auto;

            & code {
                font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace;
                font-size: 0.85rem;
                line-height: 1.7;
                color: var(--neutral-700);
            }
        }
    }
</style>
