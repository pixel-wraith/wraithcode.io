<script lang="ts">
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import { onMount } from "svelte";

    type LogMessage = {
        type: 'success' | 'error' | 'neutral';
        message: string;
    }

    const { data } = $props();
    const log1 = $state<Array<LogMessage>>([]);
    const log2 = $state<Array<LogMessage>>([]);
    const log3 = $state<Array<LogMessage>>([]);

    const promiseTryCode1 = `const doStuff = () => {
    return 'stuff complete';
}

Promise.try(doStuff)
    .then(result => console.log(result))
    .catch(err => console.error(err))
    .finally(() => console.log('process done'));`

    const promiseTryCode2 = `const doOtherStuff = () => {
    throw new Error('Uh oh!');
}

Promise.try(doOtherStuff)
    .then(result => console.error(result))
    .catch(err => console.error(err))
    .finally(() => console.log('process done'));`

    const promiseTryCode3 = `const doMoreStuff = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('stuff complete');
    }, 1000);
})

Promise.try(doMoreStuff)
    .then(result => console.log(result))
    .catch(err => console.error(err))
    .finally(() => console.log('process done'));`

    onMount(() => {
        const doStuff = () => {
            return 'stuff complete';
        }

        Promise.try(doStuff)
            .then(result => log1.push({ type: 'success', message: result }))
            .catch(err => log1.push({ type: 'error', message: err.message }))
            .finally(() => log1.push({ type: 'neutral', message: 'process done' }));

        const doOtherStuff = () => {
            throw new Error('Uh oh!');
        }

        Promise.try(doOtherStuff)
            .then(result => log2.push({ type: 'success', message: result }))
            .catch(err => log2.push({ type: 'error', message: err.message }))
            .finally(() => log2.push({ type: 'neutral', message: 'process done' }));

        const doMoreStuff = () => new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve('stuff complete');
            }, 1000);
        })

        Promise.try(doMoreStuff)
            .then(result => log3.push({ type: 'success', message: result }))
            .catch(err => log3.push({ type: 'error', message: err.message }))
            .finally(() => log3.push({ type: 'neutral', message: 'process done' }));
    });
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title={data.experiment.title}>
    <p>
        Turn any function into a Promise with <code>Promise.try</code>.
    </p>
</ExperimentTitle>

<Stone>
    <div class="container flex-center">
        <div class="example-container">
            <CodeBlock code={promiseTryCode1} lang="typescript" />

            <div class="log-container">
                <ul class="log">
                    {#each log1 as log, index}
                        <li class="log-message {log.type}">
                            <span>{index}:</span>
                            {log.message}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <div class="example-container">
            <CodeBlock code={promiseTryCode2} lang="typescript" />

            <div class="log-container">
                <ul class="log">
                    {#each log2 as log, index}
                        <li class="log-message {log.type}">
                            <span>{index}:</span>
                            {log.message}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <div class="example-container">
            <CodeBlock code={promiseTryCode3} lang="typescript" />

            <div class="log-container">
                <ul class="log">
                    {#each log3 as log, index}
                        <li class="log-message {log.type}">
                            <span>{index}:</span>
                            {log.message}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</Stone>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    .example-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;

        &:not(:last-child) {
            border-bottom: 1px solid var(--neutral-300);
        }
    }

    .log-container {
        width: 100%;
        padding: 0.5rem 1rem;
        background: var(--neutral-0);
        border: 1px solid var(--neutral-300);
        border-radius: 0.5rem;
    }

    .log {
        list-style:  none;
    }

    .log-message {
        &.success {
            color: var(--success-500);
        }

        &.error {
            color: var(--danger-500);
        }

        &.neutral {
            color: var(--neutral-500);
        }

        span {
            display: inline-block;
            width: 1rem;
            margin-right: 0.5rem;
            color: var(--neutral-500);
            text-align: right;
        }
    }
</style>
