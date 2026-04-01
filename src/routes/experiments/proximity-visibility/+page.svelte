<script lang="ts">
    // import CodeBlock from "$lib/components/CodeBlock.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";

    const { data } = $props();

    let hiddenElements: HTMLDivElement[] = $state([]);
    let mouseX = $state(0);
    let mouseY = $state(0);
    let dirty = $state(false);

    const MAX_RADIUS = 100; // start becoming visible at this distance
    const MIN_RADIUS = 10; // fully visible when within this distance

    // Utility: clamp, map distance to [0,1] where 0=far, 1=close
    function proximityAlpha(distance: number, minR = MIN_RADIUS, maxR = MAX_RADIUS) {
        if (distance <= minR)
            return 1;
        if (distance >= maxR)
            return 0;
        // Linear interpolation from maxR..minR to 0..1
        return 1 - (distance - minR) / (maxR - minR);
    }

    // Compute shortest distance from a point to an axis-aligned rectangle
    function pointToRectDistance(px: number, py: number, rect: DOMRect) {
        // Rect edges
        const rx1 = rect.left;
        const ry1 = rect.top;
        const rx2 = rect.right;
        const ry2 = rect.bottom;

        // dx, dy are 0 if inside projection; otherwise distance to nearest edge
        const dx = px < rx1 ? rx1 - px : (px > rx2 ? px - rx2 : 0);
        const dy = py < ry1 ? ry1 - py : (py > ry2 ? py - ry2 : 0);
        // If inside rect, both dx and dy are 0 -> distance 0
        return Math.hypot(dx, dy);
    }

    const update = () => {
        if (!hiddenElements.length)
            return;

        dirty = false;
        for (const hiddenElement of hiddenElements) {
            const rect = hiddenElement.getBoundingClientRect();
            const dist = pointToRectDistance(mouseX, mouseY, rect);
            const alpha = proximityAlpha(dist);
            hiddenElement.style.opacity = alpha.toFixed(3);
        }
    };

    const schedule = () => {
        if (!dirty) {
            dirty = true;
            requestAnimationFrame(update);
        }
    };

    // Pointer events offer broader device support
    const handler = (e: PointerEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        schedule();
    };

    window.addEventListener('pointermove', handler, { passive: true });

    requestAnimationFrame(update);
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title="Orphans">
    <p>
        We can hide an element on the page, and then make it visible when the mouse is close to it.
    </p>
</ExperimentTitle>

<Stone>
    <div class="container">
        <div class="hidden-element" bind:this={hiddenElements[0]}>
            Now you see me...
        </div>

        <div class="hidden-element" bind:this={hiddenElements[1]}>
            Now you see me...
        </div>

        <div class="hidden-element" bind:this={hiddenElements[2]}>
            Now you see me...
        </div>
    </div>
</Stone>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 25rem;
        padding: 1rem;
    }

    .hidden-element {
        opacity: 0;
        transition: opacity 80ms linear; /* small smoothing without lag */
        will-change: opacity;
    }
</style>