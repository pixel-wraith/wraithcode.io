<script>
    import DashboardExperiment from "$lib/components/DashboardExperiment.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import { ContentTypes } from "$lib/schemas/contents";

    const { data } = $props();

    const latestExperiment = $derived(data.experiments[0]);
    const recentExperiments = $derived(data.experiments.slice(1));
    const contents = $derived(data.contents);
</script>

<svelte:head>
    <title>WraithCode</title>
</svelte:head>

<Stone>
    <div class="stone-1">
        <h1 class="hero-title">WraithCode</h1>
    </div>
</Stone>

<div class="featured-items">
    <Stone>
        This is is just a test...
    </Stone>

    <Stone>
        This is is just a test...
    </Stone>

    <Stone>
        This is is just a test...
    </Stone>
</div>

<Stone>
    <section class="recent-experiments">
        <header class="recent-experiments-header">
            <h2>The Lab</h2>

            <p>
                From plaing with new tools and technologies, to working on a random idea, there's so much cool
                stuff to build! Here's what I've been experimenting with recently...
            </p>
        </header>

        <DashboardExperiment experiment={latestExperiment} index={0} />

        <div class="recent-experiments-inner">
            {#each recentExperiments as experiment, index (experiment.id)}
                <DashboardExperiment {experiment} index={index + 1} />
            {/each}
        </div>
    </section>
</Stone>

<Stone>
    <section class="recent-reads">
        <header class="recent-reads-header">
            <h2>Interesting Content</h2>

            <p>
                There's so much information out there just waiting to be consumed! Here's what I've found interesting recently...
            </p>
        </header>

        {#each contents as content, index (content.id)}
            <a href={content.url} target="_blank" rel="noopener noreferrer" class="content-item">
                <div class="content-num">
                    <span>0{index + 1}</span>

                    <div class="content-type-icon">
                        {#if content.type === ContentTypes.BOOK}
                            <Icon icon="fa-solid fa-book" size="1rem" theme="accent2" />
                        {:else if content.type === ContentTypes.ARTICLE}
                            <Icon icon="fa-solid fa-file-lines" size="1rem" theme="accent2" />
                        {:else if content.type === ContentTypes.VIDEO}
                            <Icon icon="fa-solid fa-video" size="1rem" theme="accent2" />
                        {:else if content.type === ContentTypes.PODCAST}
                            <Icon icon="fa-solid fa-podcast" size="1rem" theme="accent2" />
                        {:else if content.type === ContentTypes.COURSE}
                            <Icon icon="fa-solid fa-graduation-cap" size="1rem" theme="accent2" />
                        {/if}
                    </div>
                </div>

                <div class="content-info">
                    <span class="content-title">{content.title}</span>
                    <span class="content-author">{content.author}</span>
                </div>

                <div class="content-explore">
                    <div
                        class="content-type"
                        class:book={content.type === ContentTypes.BOOK}
                        class:article={content.type === ContentTypes.ARTICLE}
                        class:video={content.type === ContentTypes.VIDEO}
                        class:podcast={content.type === ContentTypes.PODCAST}
                        class:course={content.type === ContentTypes.COURSE}
                    >
                        {content.type}
                    </div>

                    <i class="fa-regular fa-arrow-up-right-from-square"></i>
                </div>
            </a>
        {/each}
    </section>
</Stone>

<style>
    .stone-1 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 15rem;
    }

    .hero-title {
        background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 40%, var(--primary-400) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .featured-items {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
        padding: 1rem 2rem;
    }

    .recent-experiments {
        position: relative;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
        width: 100%;
        padding: 1rem;
        overflow: hidden;

        & header {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0 2rem 1rem;
            z-index: 1;

            & h2 {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 3rem;
            }
        }

        & .recent-experiments-inner {
            position: relative;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            z-index: 1;
        }
    }

    .recent-reads {
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
        }

        & .content-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
            padding: 1rem;
            background-color: var(--neutral-150);
            border-radius: 0.5rem;
            border: 1px solid var(--neutral-250);
            color: inherit;
            text-decoration: none;
            transition: all 0.25s ease-in-out;

            &:hover {
                border: 1px solid var(--accent2-500);
                transform: scale(1.01);
                transition: all 0.25s ease-in-out;
                cursor: pointer;

                & .content-num .content-type-icon,
                & .content-explore .content-type {
                    background-color: var(--accent2-100);
                    border: 1px solid var(--accent2-300);
                    transition: all 0.25s ease-in-out;
                }

                & .content-explore i {
                    color: var(--accent2-300);
                    translate: 0.2rem -0.2rem;
                    transition: all 0.25s ease-in-out;
                }
            }
        }

        & .content-num {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1rem;
            margin: 0;
            padding: 0;

            & > span {
                font-family: var(--header-font);
                font-size: 1rem;
                font-weight: 500;
                color: var(--neutral-400);
            }

            & .content-type-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.25rem 0.5rem;
                background-color: var(--neutral-200);
                border: 1px solid var(--neutral-300);
                border-radius: 0.25rem;
                transition: all 0.25s ease-in-out;
            }
        }

        & .content-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            flex-grow: 1;
            gap: 0.25rem;

            & .content-title {
                font-weight: 500;
            }

            & .content-author {
                font-size: 0.875rem;
                color: var(--neutral-600);
            }
        }

        & .content-explore {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 1rem;

            & .content-type {
                padding: 0.25rem 0.5rem;
                background-color: var(--neutral-200);
                border-radius: 0.25rem;
                border: 1px solid var(--neutral-300);
                font-size: 0.875rem;
                text-transform: capitalize;
                transition: all 0.25s ease-in-out;
            }

            & i {
                font-size: 0.875rem;
                color: var(--neutral-600);
                transition: all 0.25s ease-in-out;
            }
        }
    }

    @media (max-width: 768px) {
        .featured-items {
            grid-template-columns: repeat(1, 1fr);
            padding: 0;
        }

        .recent-experiments {
            & .recent-experiments-inner {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }
</style>