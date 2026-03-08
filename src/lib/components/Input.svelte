<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    interface IInputProps extends HTMLInputAttributes {
        id: string;
        name: string;
        value?: string | number;
        label?: string;
        text?: string;
        error?: string;
        type?: HTMLInputElement['type'];
        required?: boolean;
        theme?: 'primary' | 'accent1' | 'accent2' | 'success' | 'danger';
    }

    let {
        id,
        name,
        value = $bindable(''),
        label,
        text,
        error,
        required = false,
        theme = 'primary',
        type = 'text',
        ...restProps
    }: IInputProps = $props();

    let ref: HTMLInputElement;
</script>

<div class="input-container">
    {#if label}
        <label for={id}>
            {label}
            {#if !required}
                <span>- Optional</span>
            {/if}
        </label>
    {/if}

    <input
        {id}
        {required}
        {name}
        {type}
        class="{theme} {error ? 'error' : ''}"
        bind:this={ref}
        bind:value={value}
        {...restProps}
    />

    {#if text && !error}
        <p class="text" data-testid={`${id}-text`}>{text}</p>
    {/if}

    {#if error}
        <p class="error" data-testid={`${id}-error`}>{error}</p>
    {/if}
</div>

<style>
    .input-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
        padding: var(--outline-offset);
    }

    label {
        font-weight: 500;

        & span {
            color: var(--neutral-900);
        }
    }

    p {
        margin: 0;

        &.text {
            color: var(--neutral-700);
            font-size: 0.85rem;
            line-height: 1.2rem;
            text-align: left;
        }
    }

    input {
        width: 100%;
        padding: 0.3rem;
        border-radius: 0.25rem;
        color: var(--neutral-900);
        font-size: 1rem;
        background-color: var(--neutral-100);

        &::placeholder {
            color: var(--neutral-400) !important;
        }

        &.primary {
            border: 1px solid var(--neutral-300);
        }

        &.accent1 {
            border: 1px solid var(--neutral-300);
        }

        &.accent2 {
            border: 1px solid var(--neutral-300);
        }

        &.success {
            border: 1px solid var(--neutral-300);
        }

        &.danger {
            border: 1px solid var(--neutral-300);
        }

        &:disabled {
            border: 1px solid var(--neutral-200);
            color: var(--neutral-450);
        }

        &.error {
            border-color: var(--danger-500);
        }
    }
</style>