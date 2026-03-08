<script lang="ts">
    import '$lib/assets/css/styles.css';
    import favicon from '$lib/assets/favicon.svg';
    import IconLink from '$lib/components/IconLink.svelte';

    const { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="main-container">
    <div class="main-container-inner">
        <header>
            <div class="header-stone">
                <div class="header-stone-inner">
                    <IconLink
                        href="/"
                        title="Home"
                        icon="fa-solid fa-ghost"
                        size="1.75rem"
                        hoverable
                    />
                </div>
            </div>
        </header>

        <main>
            {@render children()}
        </main>

        <footer>
            <div class="footer-stone">
                <div class="footer-stone-inner">
                    <span class="copyright">Copyright © 2026 WraithCode. All rights reserved.</span>

                    <IconLink
                        icon="fa-brands fa-github"
                        href="https://github.com/pixel-wraith/wraithcode.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="1rem"
                        theme="accent2"
                        hoverable
                    />
                </div>
            </div>
        </footer>
    </div>
</div>

<style>
	.main-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: var(--primary-800);
		background: radial-gradient(ellipse at center, var(--primary-700) 0%, var(--primary-100) 100%);
	}

	.main-container-inner {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
		width: 96%;
		max-width: 1200px;
        min-height: 100vh;
        margin: 0 auto;
    }

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .header-stone {
        min-width: 10rem;
        padding: 0 0.1rem 0.1rem;
        background-color: var(--neutral-100);
        background-image: radial-gradient(circle at 30% 0%, var(--neutral-600), var(--neutral-100));
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        box-shadow: 0 0 10px -2px var(--primary-200),
                    0 0 25px -2px var(--primary-300),
                    0 0 30px -2px var(--primary-400),
                    inset 0 0 10px -1px var(--primary-500);

        & .header-stone-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 0.5rem;
            background-color: var(--neutral-100);
            background-image: radial-gradient(circle at 30% 0%, var(--neutral-150), var(--neutral-100));
            border-bottom-right-radius: 0.4rem;
            border-bottom-left-radius: 0.4rem;
        }
    }

    main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: 1.25rem;
    }

    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .footer-stone {
        min-width: 10rem;
        padding: 0.1rem 0.1rem 0;
        background-color: var(--neutral-100);
        background-image: radial-gradient(circle at 30% 0%, var(--neutral-600), var(--neutral-100));
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        box-shadow: 0 0 10px -2px var(--primary-200),
                    0 0 25px -2px var(--primary-300),
                    0 0 30px -2px var(--primary-400),
                    inset 0 0 10px -1px var(--primary-500);

        & .footer-stone-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            width: 100%;
            height: 100%;
            padding: 0.5rem 1rem;
            background-color: var(--neutral-100);
            background-image: radial-gradient(circle at 30% 0%, var(--neutral-150), var(--neutral-100));
            border-top-right-radius: 0.4rem;
            border-top-left-radius: 0.4rem;

            & .copyright {
                font-size: 0.8rem;
            }
        }
    }
</style>