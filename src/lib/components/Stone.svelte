<script lang="ts">
    import type { Snippet } from "svelte";

    interface IStoneProps {
        hoverable?: boolean;
        children: Snippet;
    }

    const { hoverable, children }: IStoneProps = $props();
</script>

<div class="stone" class:hoverable={hoverable}>
    <div class="stone-inner">
        {@render children()}
    </div>
</div>

<style>
    .stone {
        padding: 0.1rem;
        background-color: var(--neutral-100);
        background-image: radial-gradient(circle at 30% 0%, var(--neutral-600), var(--neutral-100));
        border-radius: 0.5rem;
        box-shadow: 0 0 10px -2px var(--primary-200),
                    0 0 25px -2px var(--primary-300),
                    0 0 30px -2px var(--primary-400),
                    inset 0 0 10px -1px var(--primary-500);

        &.hoverable {
            transition: all 0.25s ease-in-out;

            &:hover,
            &:focus-within {
                transform: scale(1.01);
                background-image: radial-gradient(circle at 30% 0%, var(--accent2-500), var(--accent2-100));
                box-shadow: 0 0 10px -2px var(--primary-100),
                    0 0 25px -2px var(--primary-200),
                    0 0 30px -2px var(--primary-300),
                    inset 0 0 10px -1px var(--primary-400);
                transition: all 0.25s ease-in-out;
                cursor: pointer;
            }
        }

        & .stone-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 1rem;
            background-color: var(--neutral-100);
            background-image: radial-gradient(circle at 30% 0%, var(--neutral-150), var(--neutral-100));
            border-radius: 0.4rem;
        }
    }
</style>