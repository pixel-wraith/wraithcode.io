<script lang="ts">
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import { isMotionEnabled } from "$lib/utils/animations";
    import { getRandomInt, normalize } from "$lib/utils/number";
    import { onMount } from "svelte";

    let liked = $state(false);
    let buttonRef: HTMLButtonElement | null = $state(null);
    let particles: HTMLSpanElement[] = $state([]);

    const PARTICLE_DELAY = 300;
    const PARTICLE_COUNT = 20;
    const MIN_DISTANCE = 32;
    const MAX_DISTANCE = 64;
    const JITTER = 40;
    const MAX_FADE_DELAY = 500;
    const MIN_FADE_DURATION = 500;
    const MAX_FADE_DURATION = 1500;
    // const MAGNITUDE = 48; // 64 was too much, 32 was not enough

    onMount(() => {
        buttonRef?.style.setProperty(
            '--pop-circle-delay',
            `${PARTICLE_DELAY / 2}ms`,
        );
        buttonRef?.style.setProperty(
            '--pop-circle-duration',
            `${PARTICLE_DELAY}ms`,
        );
    })

    const convertDegreesToRadians = (angle: number) => {
        return (angle * Math.PI) / 180;
    };

    const convertPolarToCartesian = (angle: number, distance: number) => {
        const angleInRadians = convertDegreesToRadians(angle);
        const x = distance * Math.cos(angleInRadians);
        const y = distance * Math.sin(angleInRadians);
        return [x, y];
    };

    const onClick = () => {
        liked = !liked;

        if (!liked || !buttonRef) {
            return null;
        }

        if (!isMotionEnabled()) {
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
            const distance = getRandomInt(MIN_DISTANCE, MAX_DISTANCE);
            const fadeDelay = normalize(distance, MIN_DISTANCE, MAX_DISTANCE, 0, MAX_FADE_DELAY);
            const fadeDuration = normalize(distance, MIN_DISTANCE, MAX_DISTANCE, MIN_FADE_DURATION, MAX_FADE_DURATION);
            const popDuration = normalize(distance, MIN_DISTANCE, MAX_DISTANCE, 300, 700);
            // can also add some variation to size
            // can also add a twinkling effect, so the particles twinkle as they fade out

            const [x, y] = convertPolarToCartesian(angle, distance);
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            particle.style.setProperty('--fade-delay', `${fadeDelay}ms`);
            particle.style.setProperty('--fade-duration', `${fadeDuration}ms`);
            particle.style.setProperty('--pop-duration', `${popDuration}ms`);

            particles.push(particle);
        }

        window.setTimeout(() => {
            particles.forEach((particle) => {
                buttonRef?.appendChild(particle);
            });
        }, PARTICLE_DELAY);

        const cleanupDuration = MAX_FADE_DURATION
            + MAX_FADE_DELAY
            + PARTICLE_DELAY
            + 200;

        window.setTimeout(() => {
            particles.forEach((particle) => {
                buttonRef?.removeChild(particle);
            });
            particles = [];
        }, cleanupDuration);
    };
</script>

<ExperimentHeader links={[]} back={{ text: "Back to Particles", route: "/experiments/whimsical-animations/particles" }} />

<ExperimentTitle title="Particle Generation" />

<Stone>
    <div class="container">
        <button
            aria-label="Toggle like"
            onclick={onClick}
            bind:this={buttonRef}
            class:liked={liked}
        >
            <span class="pop-circle"></span>
            {#if liked}
                <i class="fa-solid fa-heart"></i>
            {:else}
                <i class="fa-regular fa-heart"></i>
            {/if}
        </button>

        <div class="no-motion-banner">
            You have requested reduced motion, so the animations on this page may not work as expected.
        </div>
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
            fade-out var(--fade-duration) var(--fade-delay) forwards,
            disperse var(--pop-duration) forwards var(--particle-curve);
        pointer-events: none;
        user-select: none;
    }

    .container {
        display: flex;
        flex-direction: column;
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
            position: relative;
            font-size: 2.5rem;
            z-index: 1;
        }
    }

    .pop-circle {
        position: absolute;
        inset: 0;
        border: 2px solid var(--accent2-500);
        border-radius: 50%;
        opacity: 0;
    }

    button.liked .pop-circle {
        animation:
            fromShrunken var(--pop-circle-duration),
            fromThickBorder var(--pop-circle-duration) var(--pop-circle-delay) backwards,
            circleColorShift var(--pop-circle-duration),
            fadeFromOpaque 300ms var(--pop-circle-duration) backwards;
    }

    .no-motion-banner {
        display: none;
        margin-top: 2rem;
        padding: 1rem;
        border: 1px solid var(--primary-500);
    }

    @media (prefers-reduced-motion: reduce) {
        .no-motion-banner {
            display: block;
        }
    }

    @keyframes fromShrunken {
        from {
            transform: scale(0);
        }
    }
    @keyframes fromThickBorder {
        from {
            border: 12px solid var(--accent2-500);
        }
    }
    @keyframes circleColorShift {
        from {
            background: var(--accent2-200)
        }
    }
    @keyframes fadeFromOpaque {
        from {
            opacity: 1;
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
