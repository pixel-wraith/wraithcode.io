<script lang="ts">
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import { onMount } from "svelte";

    const { data } = $props();

    let details: HTMLDetailsElement;
    let _accordion: Accordion | null = $state(null);

    // https://css-tricks.com/how-to-animate-the-details-element/
    class Accordion {
        private el: HTMLDetailsElement;
        private summary: HTMLElement;
        private content: HTMLElement;
        private animation: Animation | null;
        private isClosing: boolean;
        private isExpanding: boolean;

        constructor(el: HTMLDetailsElement) {
            this.el = el;
            this.summary = el.querySelector('summary')!;
            this.content = el.querySelector('.content')!;

            this.animation = null;
            this.isClosing = false;
            this.isExpanding = false;
            this.summary.addEventListener('click', this.onClick);
        }

        onClick = (e: MouseEvent) => {
            e.preventDefault();

            this.el.style.overflow = 'hidden';

            if (this.isClosing || !this.el.open) {
                this.open();
            } else if (this.isExpanding || this.el.open) {
                this.shrink();
            }
        }

        shrink = () => {
            this.isClosing = true;

            const startHeight = `${this.el.offsetHeight}px`;
            const endHeight = `${this.summary.offsetHeight}px`;

            if (this.animation) {
                this.animation.cancel();
            }

            this.animation = this.el.animate(
                {
                    height: [startHeight, endHeight],
                },
                {
                    duration: 300,
                    easing: 'ease-in-out',
                },
            );

            this.animation.onfinish = () => this.onAnimationFinish(false);
            this.animation.oncancel = () => this.isClosing = false;
        }

        open = () => {
            this.el.style.height = `${this.el.offsetHeight}px`;
            this.el.open = true;
            window.requestAnimationFrame(this.expand);
        }

        expand = () => {
            this.isExpanding = true;

            const startHeight = `${this.el.offsetHeight}px`;
            const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

            if (this.animation) {
                this.animation.cancel();
            }

            this.animation = this.el.animate(
                {
                    height: [startHeight, endHeight],
                },
                {
                    duration: 400,
                    easing: 'ease-out',
                },
            );

            this.animation.onfinish = () => this.onAnimationFinish(true);
            this.animation.oncancel = () => this.isExpanding = false;
        }

        onAnimationFinish = (open: boolean) => {
            this.el.open = open;
            this.animation = null;
            this.isClosing = false;
            this.isExpanding = false;
            this.el.style.height = this.el.style.overflow = '';
        }
    }

    onMount(() => {
        _accordion = new Accordion(details);
    });
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title={data.experiment.title}>
    <p>
        Playing around with the <code>&lt;details&gt;</code> element to see what can be done with it.
    </p>
</ExperimentTitle>

<Stone>
    <div class="container">
        <details bind:this={details}>
            <summary>
                <span class="read-more">
                    Read More
                </span>

                <span class="read-less">
                    Read Less
                </span>
            </summary>

            <div class="content">
                Did you know that HTML includes a <code>&lt;details&gt;</code> element that can be used to create an interactive accordion menu?!
                The <code>&lt;details&gt;</code> element represents a disclosure widget from which the user can obtain additional information or
                controls. By default, the widget is closed. When the widget is open, the user can interact with the contents of the
                <code>&lt;details&gt;</code> element.
            </div>
        </details>
    </div>
</Stone>

<style>
    .container {
        width: 100%;
        max-width: 30rem;
        min-height: 20rem;
        margin: 2rem auto 0;
        padding: 1rem;
    }

    details {
        border: 1px solid var(--neutral-300);
        border-radius: 4px;
        font-weight: 400;
        cursor: pointer;

        &[open] {
            & .read-more {
                display: none;
            }

            & .read-less {
                display: inline;
            }
        }

        & .read-more {
            display: inline;
        }

        & .read-less {
            display: none;
        }
    }

    summary {
        padding: 0.5rem 1rem;
        color: var(--primary-500);

        & span {
            padding-left: 0.5rem;
            color: var(--primary-500);
        }
    }

    .content {
        padding: 0.5rem 1rem;
    }

    code {
        color: var(--primary-500);
    }
</style>