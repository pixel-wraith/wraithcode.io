<script>
    import chester from "$lib/assets/images/chester_without_shadow.svg";
    import hydieLogo from "$lib/assets/images/hydie-logo.svg";
    import tydalwaveLogo from "$lib/assets/images/tydalwave-logo.svg";
    import DashboardExperiment from "$lib/components/DashboardExperiment.svelte";
    import Stone from "$lib/components/Stone.svelte";

    const { data } = $props();

    const latestExperiment = $derived(data.experiments[0]);
    const recentExperiments = $derived(data.experiments.slice(1));
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
        <div class="featured-item">
            <div>
                <div class="featured-item-image">
                    <img src={chester} alt="A cute, chubby little bee named Chester" />
                </div>

                <div class="h3">BuzyBee</div>

                <p>BuzyBee is the personal productivity app built around the Getting Things Done (GTD) methodology. Back with a fresh look and AI support, BuzyBee helps you get things done.</p>
            </div>

            <div class="featured-item-link">
                <a
                    href="https://buzybee.buzz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Start Getting Sh*t Done
                </a>
            </div>
        </div>
    </Stone>

    <Stone>
        <div class="featured-item">
            <div>
                <div class="featured-item-image tydalwave">
                    <img src={tydalwaveLogo} alt="TydalWave logo" />
                </div>

                <div class="h3">TydalWave</div>

                <p>TydalWave makes stitching your data together easy. It's a tool that helps you combine data from multiple sources, and easily identify duplicates between them based on fuzzy matching.</p>
            </div>

            <div class="featured-item-link">
                <a
                    href="https://tydalwave.wraithcode.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Start Stitching Your Data
                </a>
            </div>
        </div>
    </Stone>

    <Stone>
        <div class="featured-item">
            <div>
                <div class="featured-item-image hydie">
                    <img src={hydieLogo} alt="Hydie logo" />
                </div>

                <div class="h3">Hydie</div>

                <p>
                    Average PR size, time to merge, even how many PRs each member of the team is reviewing. Hydie is a simple, yet powerful tool to help you understand how your dev team is doing. (We like to use it for team olympics to compete with each other!)
                </p>
            </div>

            <div class="featured-item-link">
                <a
                    href="https://github.com/pixel-wraith/hydie"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Get Insights Into Your Dev Team
                </a>
            </div>
        </div>
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

        <div class="view-all-link-container">
            <a href="/experiments" class="view-all-link">
                View All Experiments
                <i class="fa-regular fa-arrow-right"></i>
            </a>
        </div>
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

    .featured-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        height: 100%;
        padding: 0.5rem;
    }

    .featured-item-image {
        display: flex;
        align-items: center;
        justify-content: center;

        & > * {
            display: block;
            width: 4rem;
            height: 4rem;
            object-fit: contain;
        }
    }

    .featured-item-link {
        display: flex;
        align-items: center;
        justify-content: center;

        & a {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: var(--primary-100);
            border-radius: 0.5rem;
            border: 1px solid var(--primary-500);
            color: var(--neutral-900);
            text-decoration: none;
            transition: all 0.25s ease-in-out;

            &:hover {
                background-color: var(--primary-300);
                border: 1px solid var(--primary-700);
                color: var(--neutral-900);
                cursor: pointer;
            }
        }
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

        & .view-all-link-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0.5rem;
        }

        & .view-all-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: var(--primary-500);
            text-decoration: none;
            transition: all 0.25s ease-in-out;

            & i {
                transition: all 0.25s ease-in-out;
            }

            &:hover {
                color: var(--primary-300);
                cursor: pointer;

                & i {
                    translate: 0.25rem 0;
                }
            }
        }
    }

    @media (max-width: 1024px) {
        .featured-items {
            grid-template-columns: repeat(1, 1fr);
            padding: 0;
        }
    }

    @media (max-width: 768px) {
        .recent-experiments {
            & .recent-experiments-inner {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }
</style>
