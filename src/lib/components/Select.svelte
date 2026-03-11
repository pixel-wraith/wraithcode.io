<script lang="ts">
    import type { Theme } from "$lib/types/props";
    import type { HTMLSelectAttributes } from "svelte/elements";

    interface IOption {
        value: string;
        label: string;
    }

    interface ISelectProps extends HTMLSelectAttributes {
        id: string;
        name: string;
        value?: string | number;
        label?: string;
        text?: string;
        error?: string;
        required?: boolean;
        options: IOption[];
        theme?: Theme;
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
        options,
        ...restProps
    }: ISelectProps = $props();

    let ref: HTMLSelectElement;
</script>

<div class="container">
    {#if label}
        <label for={id}>
            {label}
            {#if !required}
                <span>- Optional</span>
            {/if}
        </label>
    {/if}

    <select
        {id}
        {required}
        {name}
        class="{theme} {error ? 'error' : ''}"
        bind:this={ref}
        bind:value={value}
        {...restProps}
    >
        {#each options as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>

    {#if text && !error}
        <p class="text" data-testid={`${id}-text`}>{text}</p>
    {/if}

    {#if error}
        <p class="error" data-testid={`${id}-error`}>{error}</p>
    {/if}
</div>

<style>
    .container {
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

    select {
        width: 100%;
        padding: 0.3rem;
        border-radius: 0.25rem;
        color: var(--neutral-900);
        background-color: var(--neutral-100);

        &::placeholder {
            color: var(--neutral-400) !important;
        }

        &.neutral {
            border: 1px solid var(--neutral-300);
        }

        &.light {
            border: 1px solid var(--neutral-800);
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
