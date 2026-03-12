<script lang="ts">
    import type { Snippet } from "svelte";

    import Stone from "./Stone.svelte";

    interface IExperimentTitleProps {
        title: string;
        children?: Snippet;
    }

    const { title, children }: IExperimentTitleProps = $props();
</script>

<Stone>
    <div class="experiment-title-inner">
        <h1>{title}</h1>

        {@render children?.()}
    </div>
</Stone>

<style>
    .experiment-title-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>