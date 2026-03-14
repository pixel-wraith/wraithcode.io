<script lang="ts">
    import type { IBlogPost } from "$lib/types/blog.js";

    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import { onMount } from "svelte";

    const { data } = $props();

    let featuredArticles: IBlogPost[] = $state([]);

    const clientSideCode = `/**
 * Fetches the 5 most recent featured articles from the DEV API
 *
 * ℹ️ This is an open endpoint, meaning it does not require an API key.
 * And since dev.to only disables CORS for authenticated endpoints, we
 * are able to make this request from the browser.
 */
async function fetchFeaturedArticles() {
    const res = await fetch('https://dev.to/api/articles?per_page=5');

    featuredArticles = await res.json();
}
        `;

    const serverSideCode = `/**
 * Fetch my 5 latest published articles from dev.to
 *
 * ℹ️ We are doing this on the server-side because authenticated
 * endpoints are CORS disabled...meaning we cannot make them from
 * the browser.
 */
const res = await fetch('https://dev.to/api/articles/me/published?per_page=5', {
    headers: {
        /**
         * ℹ️ This is my secret API key. It's been stored in a .env file
         * and imported here. This is a server-side file, so it's safe to
         * store it here.
         */
        'api-key': DEV_TO_API_KEY,
    },
});

articles = await res.json() as IBlogPost[];

return { articles };
    `;

    onMount(() => {
        fetchFeaturedArticles();
    })

    /**
     * Fetches the 5 most recent featured articles from the DEV API
     *
     * ℹ️ This is an open endpoint, meaning it does not require an API key.
     * And since dev.to only disables CORS for authenticated endpoints, we
     * are able to make this request from the browser.
     */
    async function fetchFeaturedArticles() {
        const res = await fetch('https://dev.to/api/articles?per_page=5');

        featuredArticles = await res.json();
    }
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title="Let's Play with the DEV API">
    <p>
        This is a little snippet used in one of my blog posts to illustrate how to work with the dev.to API.
    </p>
</ExperimentTitle>

<Stone>
    <div class="experiment-container">
        <h1>Let's Play with the DEV API</h1>

        <p>This is a little snippet used in one of my blog posts to illustrate how to work with the dev.to API.</p>

        <CodeBlock code={serverSideCode} lang="typescript" />

        <section>
            <h2>My Personal Articles on dev.to</h2>

            {#each data.articles || [] as article}
                <div class="article-link">
                    <a href={article.url}>{article.title}</a>
                </div>
            {/each}
        </section>

        <CodeBlock code={clientSideCode} lang="typescript" />

        <section>
            <h2>Featured Articles From dev.to</h2>

            {#each (featuredArticles || []) as article}
                <div class="article-link">
                    <a href={article.url}>{article.title}</a>
                </div>
            {/each}
        </section>
    </div>
</Stone>

<style>
    .experiment-container {
        width: 80%;
        max-width: 50rem;
        margin: 2rem auto;
    }

    section {
        margin: 2rem 0;
    }

    .article-link {
        margin: 0.5rem 0;

        & a {
            color: var(--accent1-500);
            text-decoration: none;
            transition: all 0.25s ease-in-out;

            &:hover {
                color: var(--accent1-300);
                transition: all 0.25s ease-in-out;
            }

            &:focus-visible {
                outline: 1px dashed var(--neutral-700);
                outline-offset: calc(var(--outline-offset) - 1px);
            }
        }
    }
</style>