<script lang="ts">
    import type { Experiment } from '$lib/schemas/experiments';

    import dayjs from 'dayjs';

    interface IDashboardExperimentProps {
        experiment: Experiment;
        index: number;
    }

    const { experiment, index }: IDashboardExperimentProps = $props();

    const date = $derived(dayjs(experiment.createdAt));
</script>

<a href={experiment.route}>
    <div class="num">
        0{index + 1}
    </div>

    <div class="content-container">
        <div class="content">
            <div class="title h5">{experiment.title}</div>

            <time datetime={experiment.createdAt.toISOString()}>
                {date.format('MMM D, YYYY')}
            </time>
        </div>

        <p class="description">{experiment.description}</p>

        <div class="explore">
            <span>Explore</span>
            <i class="fa-regular fa-arrow-right"></i>
        </div>
    </div>
</a>

<style>
    a {
        container-type: inline-size;
        container-name: dashboard-experiment;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        padding: 1rem;
        background-color: var(--neutral-150);
        border-radius: 0.5rem;
        border: 1px solid var(--neutral-250);
        text-decoration: none;

        &:hover,
        &:focus {
            border: 1px solid var(--primary-500);
            transition: all 0.25s ease-in-out;
            cursor: pointer;

            .explore {
                gap: 1rem;
            }

            .num {
                color: var(--primary-400);
            }

            .explore span,
            .explore i {
                color: var(--primary-500);
            }

            .explore i {
                scale: 1.2;
            }
        }
    }

    .num {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        min-width: 3.5rem;
        max-width: 3.5rem;
        padding-top: 0.25rem;
        font-family: var(--header-font);
        font-size: 2.5rem;
        font-weight: 500;
        color: var(--neutral-300)
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        margin-bottom: 0.5rem;
    }

    .title {
        margin: 0;
        text-align: left;
    }

    time {
        font-size: 0.8rem;
        color: var(--neutral-500);
        text-transform: uppercase;
        white-space: nowrap;
    }

    .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .explore {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;

        & * {
            font-size: 0.8rem;
            color: var(--neutral-500);
        }
    }

    @container dashboard-experiment (min-width: 490px) {
        .content {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .description {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>