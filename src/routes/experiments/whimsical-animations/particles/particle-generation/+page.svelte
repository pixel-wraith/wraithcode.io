<script lang="ts">
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import { getRandomInt, normalize } from "$lib/utils/number";

    let liked = $state(false);
    let buttonRef: HTMLButtonElement | null = $state(null);
    let particles: HTMLSpanElement[] = $state([]);

    const PARTICLE_COUNT = 10;
    const JITTER = 40;
    const FADE_DURATION = 1000;
    // const MAGNITUDE = 48; // 64 was too much, 32 was not enough

    const convertDegreesToRadians = (angle: number) => {
        return (angle * Math.PI) / 180;
    };

    const convertPolarToCartesian = (angle: number, radius: number) => {
        const angleInRadians = convertDegreesToRadians(angle);
        const x = radius * Math.cos(angleInRadians);
        const y = radius * Math.sin(angleInRadians);
        return [x, y];
    };

    const onClick = () => {
        liked = !liked;

        if (!liked || !buttonRef) {
            return null;
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement("span");
            particle.setAttribute('aria-hidden', 'true');
            particle.classList.add("particle-1");
            // particle.style.top = `${getRandomInt(0, 100)}%`;
            // particle.style.left = `${getRandomInt(0, 100)}%`;
            // const x = getRandomInt(-MAGNITUDE, MAGNITUDE);
            // const y = getRandomInt(-MAGNITUDE, MAGNITUDE);
            // particle.style.transform = `translate(${x}px, ${y}px)`;
            let angle = normalize(i, 0, PARTICLE_COUNT, 0, 360);
            angle += getRandomInt(-JITTER, JITTER);

            const radius = getRandomInt(32, 64);
            const [x, y] = convertPolarToCartesian(angle, radius);
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
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
        --particle-curve: cubic-bezier(0.2, 0.56, 0, 1);

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
            disperse 500ms forwards var(--particle-curve);
        pointer-events: none;
        user-select: none;
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

    @keyframes disperse {
        /*
         * in the first approach, we set the starting point here, and used JS to set the destination
         */
        /*from {
            transform: translate(0, 0);
        }*/

        /*
         * in this approach, we use the natural default starting point of all particles
         * (0, 0) and then use js to dynamically set css variables. I like this approach
         * better because of the symmetry between this keyframe and fade-out, rather than
         * mixing from and to like in the first approach.
         */
        to {
            transform: translate(var(--x), var(--y));
        }
    }
</style>
