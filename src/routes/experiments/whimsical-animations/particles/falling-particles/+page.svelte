<script lang="ts">
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import { getRandomInt } from "$lib/utils/number";
    import { onMount } from "svelte";

    let containerRef: HTMLDivElement | null = $state(null);
    const emojis = ['💩', '👻', '☠️', '💙', '💧']

    onMount(init)

    function init() {
        if (!containerRef) {
            return null;
        }

        window.setInterval(() => {
            const { particle, speed } = createParticle();
            containerRef?.appendChild(particle);

            window.setTimeout(() => {
                particle.remove();
            }, speed + 500);
        }, 200);
    }

    function createParticle() {
        const particle = document.createElement("span");
        const emoji = emojis[getRandomInt(0, emojis.length - 1)];
        particle.textContent = `${emoji}`;
        particle.classList.add("falling-particle");
        const x = getRandomInt(0, 100);
        const speed = getRandomInt(1500, 4000);
        const size = getRandomInt(2, 4);
        particle.style.left = `${x}%`;
        particle.style.animationDuration = `${speed}ms`;
        particle.style.fontSize = `${size}rem`;

        return { particle, speed };
    }
</script>

<ExperimentHeader links={[]} back={{ text: "Back to Particles", route: "/experiments/whimsical-animations/particles" }} />

<ExperimentTitle title="Falling Particles" />

<Stone>
    <div class="container" bind:this={containerRef}>

    </div>
</Stone>

<style>
    :global(.falling-particle) {
        position: absolute;
        top: 0;
        animation: fall linear forwards;
        pointer-events: none;
    }

    .container {
        position: relative;
        width: 100%;
        height: 25rem;
        overflow: hidden;
    }

    @keyframes fall {
        from {
            transform: translateX(-50%) translateY(-100%);
        }
        to {
            transform: translateX(-50%) translateY(27rem);
        }
    }
</style>
