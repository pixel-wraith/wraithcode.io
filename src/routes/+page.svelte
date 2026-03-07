<script>
    import Stone from "$lib/components/Stone.svelte";
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

        <a href="/experiments/experiment-1">
            Experiment 1
        </a>

        <div class="recent-experiments-inner">
            <a href="/experiments/experiment-1">
                Experiment 2
            </a>

            <a href="/experiments/experiment-1">
                Experiment 3
            </a>

            <a href="/experiments/experiment-1">
                Experiment 4
            </a>

            <a href="/experiments/experiment-1">
                Experiment 5
            </a>
        </div>
    </section>
</Stone>

<Stone>
    <section class="recent-reads">
        <header class="recent-reads-header">
            <h2>Interesting Content</h2>

            <p>
                There's so much interesting information just waiting to be read! Here's what I've found interesting recently...
            </p>
        </header>

        <a href="/reads/read-1">
            Read 1
        </a>

        <a href="/reads/read-1">
            Read 1
        </a>

        <a href="/reads/read-1">
            Read 1
        </a>

        <a href="/reads/read-1">
            Read 1
        </a>

        <a href="/reads/read-1">
            Read 1
        </a>
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

        & a {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 1rem;
            background-color: var(--neutral-150);
            border-radius: 0.5rem;
            border: 1px solid var(--neutral-250);
            color: inherit;
            text-decoration: none;
            transition: all 0.25s ease-in-out;
            z-index: 1;

            &:hover {
                border: 1px solid var(--accent1-500);
                transform: scale(1.01);
                transition: all 0.25s ease-in-out;
                cursor: pointer;
            }
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

        & a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
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
            }
        }
    }

    @media (max-width: 768px) {
        .featured-items {
            grid-template-columns: repeat(1, 1fr);
            padding: 0;
        }
    }
</style>