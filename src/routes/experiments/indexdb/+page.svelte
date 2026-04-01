<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit";

    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";
    import Textarea from "$lib/components/Textarea.svelte";
    import { onMount } from "svelte";

    interface IActivityLog {
        message: string;
        type: 'error' | 'success' | 'info' | 'warning';
    }

    const { data } = $props();

    let db: IDBDatabase | null = null;
    let activityLog: IActivityLog[] = $state([]);

    let message = $state('');
    const error = $state('');

    let messages: string[] = $state([]);

    onMount(() => {
        addLog('Opening database...', 'info');
        const request = window.indexedDB.open('Experiments', 2);

        request.onsuccess = (event) => {
            db = (event.target as IDBRequest).result;
            addLog('Database opened', 'success');

            // generic error handler for all errors targeted at this database's requests
            db!.onerror = (event) => {
                addLog((event.target as IDBRequest).error?.message ?? 'Uh oh, something bad happened', 'error')
            };

            // get all messages from the database
            addLog('Getting all messages...', 'info');
            const transaction = db!.transaction(["messages"], "readonly");

            transaction.onerror = (event) => {
                addLog((event.target as IDBRequest).error?.message ?? 'Unknown error', 'error');
            }

            const messagesObjectStore = transaction.objectStore("messages");

            const request = messagesObjectStore.getAll();

            request.onsuccess = (_event) => {
                messages = request.result;
                addLog('Messages retrieved', 'success');
            };
        };

        request.onerror = (event) => {
            const msg = (event.target as IDBRequest).error?.message ?? 'Failed to open database';
            addLog(msg, 'error');
        };

        // this is the only place where you can alter the structure of the database
        request.onupgradeneeded = (event) => {
            addLog('Upgrading database...', 'info');

            db = (event.target as IDBRequest).result;

            addLog('Creating object store...', 'info');
            // Create an objectStore for this database
            const objectStore = db!.createObjectStore("messages", { autoIncrement: true });

            addLog('Creating new index...', 'info');
            objectStore.createIndex("message", "message", { unique: false });

            // you can add init data here if you need...
            //
            // Use transaction oncomplete to make sure the objectStore creation is
            // finished before adding data into it.
            objectStore.transaction.oncomplete = (_event) => {
                addLog('Adding initial data...', 'info');

                const defaultMessages = [
                    'Hi! Welcome to the IndexedDB experiment.',
                    'As you can see, we are able to store data in the browser and retrieve it later.',
                    'How cool is that?!',
                ];

                // if the scope is not specified, it will default to readonly
                const transaction = db!.transaction(["messages"], "readwrite");

                transaction.oncomplete = (_event) => {
                    addLog('Initial data added', 'success');
                };

                transaction.onerror = (event) => {
                    addLog((event.target as IDBRequest)?.error?.message ?? 'Unknown error', 'error');
                };

                const messagesObjectStore = transaction.objectStore("messages");

                defaultMessages.forEach((msg) => {
                    const request = messagesObjectStore.add(msg);

                    request.onsuccess = () => {
                        addLog(`Message added`, 'success');
                    };

                    request.onerror = (event) => {
                        addLog(`Failed to add message`, 'error');
                        addLog((event.target as IDBRequest)?.error?.message ?? 'Unknown error', 'error');
                    };
                });
            };
        };
    })

    function addLog(message: string, type: 'error' | 'success' | 'info' | 'warning') {
        activityLog = [...activityLog, { message, type }];
    }

    const addMessage = (message: string) => {
        messages = [...messages, message];
    }

    const onSubmit: SubmitFunction = ({ formData, cancel }) => {
        cancel();

        const newMessage = formData.get('message') as string;

        addMessage(newMessage);

        message = '';

        addLog('Adding message to database...', 'info');
        const transaction = db!.transaction(["messages"], "readwrite");
        const messagesObjectStore = transaction.objectStore("messages");

        const request = messagesObjectStore.add(newMessage);

        request.onsuccess = () => {
            addLog('Message added', 'success');
        };

        request.onerror = (event) => {
            addLog('Failed to add message', 'error');
            addLog((event.target as IDBRequest)?.error?.message ?? 'Unknown error', 'error');
        };
    };
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title={data.experiment.title}>
    <p>
        The IndexedDB API allows web applications to store data in the browser and retrieve it later.
    </p>
</ExperimentTitle>

<Stone>
    <div class="experiment-container">
        {#if error}
            <p class="error">{error}</p>
        {/if}

        <div class="main-container">
            <div class="workbench">
                <form
                    class="message-input-container"
                    method="POST"
                    action="/actions?/review"
                    data-testid="quick-review-action-form"
                    use:enhance={onSubmit}
                >
                    <Textarea
                        name="message"
                        id="message"
                        placeholder="Enter a message"
                        bind:value={message}
                    />

                    <div class="button-container">
                        <Button
                            type="submit"
                        >
                            Add Message
                        </Button>
                    </div>
                </form>

                <ul class="messages-list">
                    {#each messages as msg}
                        <li><span class="source">db:</span> {msg}</li>
                    {/each}
                </ul>
            </div>

            <div class="activity-log-container">
                <h2>Activity Log</h2>
                <ul class="activity-log">
                    {#each activityLog as log}
                        <li class="log-event {log.type}">{log.message}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</Stone>

<style>
    .experiment-container {
        width: 80%;
        max-width: 50rem;
        margin: 2rem auto;
    }

    .main-container {
        display: flex;
        gap: 1rem;
    }

    .workbench {
        flex-grow: 1;

        & form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--neutral-200);
        }

        & .button-container {
            display: flex;
            justify-content: flex-end;
        }

        & .messages-list {
            padding: 1rem 0;
            list-style: none;

            & li {
                margin-bottom: 0.25rem;
            }

            & .source {
                color: var(--neutral-450);
                font-size: 0.875rem;
                font-weight: 500;
            }
        }
    }

    .activity-log-container {
        width: 15rem;
    }

    .activity-log {
        list-style: none;
    }

    .log-event {
        padding: 0 0.5rem;
        font-size: 0.875rem;
        border-left-width: 2px;
        border-left-style: solid;

        &.error {
            border-left-color: var(--danger-100);
        }

        &.success {
            border-left-color: var(--primary-100);
        }

        &.info {
            border-left-color: var(--neutral-500);
        }

        &.warning {
            border-left-color: var(--accent1-500);
        }
    }
</style>