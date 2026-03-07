<script lang="ts">
    interface IIconProps {
        icon: string;
        size?: string;
        theme?: 'primary' | 'accent1' | 'accent2' | 'success' | 'danger';
        hoverable?: boolean;
        engaged?: boolean;
    }

    const { icon, size, theme, hoverable, engaged }: IIconProps = $props();
</script>

<div>
    <i
        class={`${icon} ${theme ? `theme-${theme}` : ''} icon`}
        class:hoverable={hoverable}
        class:engaged={engaged}
        style={`font-size: ${size};`}
    ></i>
</div>

<style>
    :global(.icon) {
        --icon-non-hoverable-color: var(--primary-500);
        --icon-hoverable-dim-color: var(--primary-400);
        --icon-hoverable-illuminated-color: var(--primary-900);
        --icon-hoverable-shadow-color-1: var(--primary-300);
        --icon-hoverable-shadow-color-2: var(--primary-400);
    }
    .icon {
        color: var(--icon-non-hoverable-color);
        transition: 0.25s ease-in-out;
        opacity: 0.7;

        &.hoverable {
            color: var(--icon-hoverable-dim-color);

            &.engaged,
            &:hover {
                color: var(--icon-hoverable-illuminated-color);
                filter: drop-shadow(0 0 4px var(--icon-hoverable-shadow-color-1))
                        drop-shadow(0 0 9px var(--icon-hoverable-shadow-color-2));
                opacity: 1;
            }
        }
    }

    .theme-primary {
        --icon-non-hoverable-color: var(--primary-500);
        --icon-hoverable-dim-color: var(--primary-400);
        --icon-hoverable-illuminated-color: var(--primary-900);
        --icon-hoverable-shadow-color-1: var(--primary-300);
        --icon-hoverable-shadow-color-2: var(--primary-400);
    }

    .theme-accent1 {
        --icon-non-hoverable-color: var(--accent1-500);
        --icon-hoverable-dim-color: var(--accent1-400);
        --icon-hoverable-illuminated-color: var(--accent1-900);
        --icon-hoverable-shadow-color-1: var(--accent1-300);
        --icon-hoverable-shadow-color-2: var(--accent1-400);
    }

    .theme-accent2 {
        --icon-non-hoverable-color: var(--accent2-500);
        --icon-hoverable-dim-color: var(--accent2-400);
        --icon-hoverable-illuminated-color: var(--accent2-900);
        --icon-hoverable-shadow-color-1: var(--accent2-300);
        --icon-hoverable-shadow-color-2: var(--accent2-400);
    }

    .theme-success {
        --icon-non-hoverable-color: var(--success-500);
        --icon-hoverable-dim-color: var(--success-400);
        --icon-hoverable-illuminated-color: var(--success-900);
        --icon-hoverable-shadow-color-1: var(--success-300);
        --icon-hoverable-shadow-color-2: var(--success-400);
    }

    .theme-danger {
        --icon-non-hoverable-color: var(--danger-500);
        --icon-hoverable-dim-color: var(--danger-400);
        --icon-hoverable-illuminated-color: var(--danger-900);
        --icon-hoverable-shadow-color-1: var(--danger-300);
        --icon-hoverable-shadow-color-2: var(--danger-400);
    }
</style>