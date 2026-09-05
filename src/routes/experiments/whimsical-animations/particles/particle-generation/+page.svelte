<script lang="ts">
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import { getRandomInt } from "$lib/utils/number";

    let liked = $state(false);
    let buttonRef: HTMLButtonElement | null = $state(null);
    let particles: HTMLSpanElement[] = $state([]);

    const PARTICLE_COUNT = 10;
    const FADE_DURATION = 1000;
    const MAGNITUDE = 48; // 64 was too much, 32 was not enough

    const onClick = () => {
        liked = !liked;

        if (!liked || !buttonRef) {
            return null;
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement("span");
            particle.classList.add("particle-1");
            // particle.style.top = `${getRandomInt(0, 100)}%`;
            // particle.style.left = `${getRandomInt(0, 100)}%`;
            const x = getRandomInt(-MAGNITUDE, MAGNITUDE);
            const y = getRandomInt(-MAGNITUDE, MAGNITUDE);
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.setProperty('--fade-duration', `${FADE_DURATION}ms`);
            buttonRef?.appendChild(particle);

            particles.push(particle);
        }

        window.setTimeout(() => {
            particles.forEach((particle) => {
                buttonRef?.removeChild(particle);
            });
            particles = [];
        }, FADE_DURATION + 200);
    };
</script>

<ExperimentHeader links={[]} back={{ text: "Back to Particles", route: "/experiments/whimsical-animations/particles" }} />

<ExperimentTitle title="Particle Generation" />

<Stone>
    <div class="container">
        <button aria-label="Toggle like" onclick={onClick} bind:this={buttonRef}>
            {#if liked}
                <i class="fa-solid fa-heart"></i>
            {:else}
                <i class="fa-regular fa-heart"></i>
            {/if}
        </button>
    </div>
</Stone>

<style>
    :global(.particle-1) {
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        inset: 0;
        margin: auto;
        background: var(--neutral-900);
        border-radius: 50%;
        /*transform: translate(-50%, -50%);*/
        animation:
            fade-out var(--fade-duration) forwards,
            from-center 300ms;
        pointer-events: none;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 25rem;
        padding: 1rem;
    }

    button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5rem;
        height: 5rem;
        background: none;
        border: none;
        border-radius: 50%;
        color: var(--accent1-500);
        cursor: pointer;

        &:hover,
        &:focus-visible {
            background: var(--neutral-200);
        }

        i {
            font-size: 2.5rem;
        }
    }

    @keyframes fade-out {
        to {
            opacity: 0;
        }
    }

    @keyframes from-center {
        from {
            transform: translate(0, 0);
        }
    }
</style>
