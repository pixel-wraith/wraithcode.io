<script lang="ts">
    import type { Size, Theme } from "$lib/types/props";

    import { browser } from "$app/environment";

    type LoaderSize = Omit<Size, 'x-small' | 'x-large'>;
    type BlockType = 'empty' | 'filled' | 'filled-half' | 'empty-half';

    interface ILoaderBar1Props {
        id: string;
        size: LoaderSize;
        speed: number;
        theme: Theme;
        pattern: 'sequential' | 'random';
    }

    interface IBlock {
        type: BlockType;
        threshold: number;
    }

    const { id, size, speed, theme, pattern }: ILoaderBar1Props = $props();

    const sizes: { name: LoaderSize; value: string }[] = [
        { name: 'small', value: '8px' },
        { name: 'medium', value: '16px' },
        { name: 'large', value: '24px' },
    ];

    const blockTypes: IBlock[] = [
        {
            type: 'empty',
            threshold: 0.4,
        },
        {
            type: 'filled',
            threshold: 0.7,
        },
        {
            type: 'filled-half',
            threshold: 0.85,
        },
        {
            type: 'empty-half',
            threshold: 0.92,
        },
    ]

    let timer: number;
    let numBlocks: number;
    let blocks: BlockType[] = $state([]);
    let activeBlock: number = $state(0);
    let blockSize: string = $state('');

    $effect(() => {
        if (size || speed || theme || pattern) {
            init();
            animate();
        }
    });

    $effect(() => {
        if (numBlocks) {
            const newBlocks: BlockType[] = [];
            while (newBlocks.length < numBlocks) {
                const rand = Math.random();
                const blockType = blockTypes.find(block => block.threshold > rand)?.type;

                if (blockType) {
                    newBlocks.push(blockType);
                }
            }
            blocks = newBlocks;
        }
    });

    function animate() {
        if (!browser)
            return;

        clearInterval(timer);

        timer = window.setInterval(() => {
            if (pattern === 'sequential') {
                activeBlock += 1;

                if (activeBlock >= numBlocks) {
                    activeBlock = 0;
                }
            }

            if (pattern === 'random') {
                activeBlock = Math.floor(Math.random() * numBlocks);
            }
        }, speed);
    }

    function init() {
        if (!browser)
            return;

        blockSize = sizes.find(s => s.name === size)?.value ?? sizes.find(s => s.name === 'medium')!.value;

        const loader = document.getElementById(id);

        if (loader && size) {
            const rect = loader.getBoundingClientRect();
            numBlocks = Math.floor(rect.width / (Number.parseInt(blockSize) + 2));
        }
    }
</script>

<div
    {id}
    class="loader"
    style="--loader-size: {blockSize}">
    {#each blocks as block, i}
        <div
            class="loader-block {block} {theme}"
            class:active={i === activeBlock}
        >
            <!-- left empty on purpose -->
        </div>
    {/each}
</div>

<style>
    .loader {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        gap: 2px;
        width: 100%;
    }

    .loader-block {
        --loader-color: var(--primary-100);
        --active-loader-color: var(--primary-600);

        position: relative;
        flex-grow: 0;
        flex-shrink: 0;
        width: var(--loader-size);
        height: var(--loader-size);
        border: 1px solid var(--loader-color);

        &.primary {
            --loader-color: var(--primary-100);
            --active-loader-color: var(--primary-600);
        }

        &.accent1 {
            --loader-color: var(--accent1-100);
            --active-loader-color: var(--accent1-600);
        }

        &.accent2 {
            --loader-color: var(--accent2-100);
            --active-loader-color: var(--accent2-600);
        }

        &.neutral {
            --loader-color: var(--neutral-300);
            --active-loader-color: var(--neutral-600);
        }

        &.danger {
            --loader-color: var(--danger-100);
            --active-loader-color: var(--danger-600);
        }

        &.success {
            --loader-color: var(--success-100);
            --active-loader-color: var(--success-600);
        }

        &.active {
            border-color: var(--active-loader-color);
            box-shadow: 0 0 12px 1px var(--active-loader-color);
            z-index: 1;

            &.filled {
                background-color: var(--active-loader-color);
            }

            &.filled-half {
                &::after {
                    background-color: var(--active-loader-color);
                }
            }

            &.empty-half {
                &::after {
                    border-color: var(--active-loader-color);
                }
            }
        }

        &.empty {
            background-color: transparent;
        }

        &.filled {
            background-color: var(--loader-color);
        }

        &.filled-half {
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50%;
                height: 50%;
                background-color: var(--loader-color);
                transform: translate(-50%, -50%);
            }
        }

        &.empty-half {
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50%;
                height: 50%;
                border: 1px solid var(--loader-color);
                transform: translate(-50%, -50%);
            }
        }
    }
</style>