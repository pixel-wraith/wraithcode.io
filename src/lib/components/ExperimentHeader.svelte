<script lang="ts">
    import type { experimentLinkSchema } from "$lib/schemas/experiments";
    import type { z } from "better-auth";

    import Stone from "./Stone.svelte";

    interface IExperimentHeaderProps {
        links: z.infer<typeof experimentLinkSchema>[];
    }

    const { links }: IExperimentHeaderProps = $props();
</script>
<Stone>
    <div class="experiment-header-inner">
        <div class="left-col">
            <a href="/experiments" class="back-to-experiments">
                <i class="fa-solid fa-arrow-left"></i>
                Back to Experiments
            </a>
        </div>

        <div class="right-col">
            {#each links as link}
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <i class={link.icon}></i>
                    {link.name}
                </a>
            {/each}
        </div>
    </div>
</Stone>

<style>
    .experiment-header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.5rem 1rem;

        a {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            text-decoration: none;
            color: var(--primary-500);
            transition: all 0.25s ease-in-out;

            i {
                color: var(--primary-500);
                transition: all 0.25s ease-in-out;
            }

            &:hover {
                color: var(--primary-300);
                transition: all 0.25s ease-in-out;

                i {
                    color: var(--primary-300);
                    transition: all 0.25s ease-in-out;
                }
            }
        }
    }

    .left-col {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .back-to-experiments:hover i {
        translate: -0.25rem 0;
    }

    .right-col {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;
    }
</style>