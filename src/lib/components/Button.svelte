<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    type ButtonKind = 'primary'
        | 'primary-transparent'
        | 'accent1'
        | 'accent1-transparent'
        | 'accent2'
        | 'accent2-transparent'
        | 'success'
        | 'success-transparent'
        | 'danger'
        | 'danger-transparent'
        | 'transparent';

    interface IButtonProps extends HTMLButtonAttributes {
        kind?: ButtonKind;
        nowrap?: boolean;
        processing?: boolean;
        size?: 'small' | 'medium' | 'large';
        children: Snippet;
    }

    const {
        type = 'button',
        kind = 'primary',
        size = 'medium',
        processing,
        nowrap = false,
        children,
        ...restProps
    }: IButtonProps = $props();
</script>

<button
    {...restProps}
    {type}
    class={`${kind} ${size}`}
    class:processing={processing}
    class:nowrap={nowrap}
>
    {#if processing}
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    {:else}
        {@render children?.()}
    {/if}
</button>

<style>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        font-weight: 400;
        border-radius: 0.25rem;

        &:not(:disabled):not(.processing):hover {
            cursor: pointer;
        }

        &:not(.processing):disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &.nowrap {
            white-space: nowrap;
        }

        &.small {
            padding: 0.15rem 0.35rem;
            font-size: 0.7rem;
        }

        &.medium {
            padding: 0.25rem 0.55rem;
            font-size: 0.875rem;
        }

        &.large {
            padding: 0.5rem 1rem;
            font-size: 1.15rem;
        }

        &.primary {
            background-color: var(--primary-100);
            border: 1px solid var(--primary-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--primary-300);
                border: 1px solid var(--primary-700);
            }

            & * {
                color: var(--primary-500);
            }
        }

        &.primary-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--primary-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--primary-700);
            }

            & * {
                color: var(--primary-500);
            }
        }

        &.accent1 {
            background-color: var(--accent1-100);
            border: 1px solid var(--accent1-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--accent1-200);
                border: 1px solid var(--accent1-700);
            }

            & * {
                color: var(--accent1-500);
            }
        }

        &.accent1-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--accent1-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--accent1-700);
            }

            & * {
                color: var(--accent1-500);
            }
        }

        &.accent2 {
            background-color: var(--accent2-100);
            border: 1px solid var(--accent2-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--accent2-300);
                border: 1px solid var(--accent2-700);
            }

            & * {
                color: var(--accent2-500);
            }
        }

        &.accent2-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--accent2-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--accent2-700);
            }

            & * {
                color: var(--accent2-500);
            }
        }

        &.neutral {
            background-color: var(--neutral-150);
            border: 1px solid var(--neutral-250);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--neutral-200);
                border: 1px solid var(--neutral-300);
            }

            & * {
                color: var(--neutral-500);
            }
        }

        &.danger {
            background-color: var(--danger-100);
            border: 1px solid var(--danger-500);
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: var(--danger-300);
                border: 1px solid var(--danger-700);
            }

            & * {
                color: var(--danger-500);
            }
        }

        &.danger-transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--danger-500);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--danger-700);
            }

            & * {
                color: var(--danger-500);
            }
        }

        &.transparent {
            padding: 0.25rem 0.5rem;
            background-color: transparent;
            border: none;
            color: var(--neutral-900);

            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                color: var(--neutral-550);
            }

            & * {
                color: var(--neutral-900);
            }
        }
    }

    .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 3rem;
        width: 100%;
        min-height: 1rem;
        height: 100%;
    }

    .spinner {
        width: 1rem;;
        height: 1rem;
        border: 2px solid var(--neutral-900);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>