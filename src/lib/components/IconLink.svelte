<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";

    import Icon from "./Icon.svelte";

    interface IIconProps extends HTMLAnchorAttributes {
        icon: string;
        size?: string;
        theme?: 'primary' | 'accent1' | 'accent2' | 'success' | 'danger';
        hoverable?: boolean;
        engaged?: boolean;
    }

    const { icon, size, theme, hoverable, engaged, ...restProps }: IIconProps = $props();

    let focussed = $state(false);
</script>

<a {...restProps} onfocusin={() => focussed = true} onfocusout={() => focussed = false}>
    <Icon
        icon={icon}
        size={size}
        theme={theme}
        hoverable={hoverable}
        engaged={engaged || focussed}
    />
</a>

<style>
    a {
        outline: none;
    }
</style>