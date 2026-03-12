<script lang="ts">
    import { browser } from "$app/environment";
    import { assets } from "$app/paths";
    import Button from "$lib/components/Button.svelte";
    import ExperimentHeader from "$lib/components/ExperimentHeader.svelte";
    import ExperimentTitle from "$lib/components/ExperimentTitle.svelte";
    import Stone from "$lib/components/Stone.svelte";

    const { data } = $props();

    let permission = $state(browser && 'Notification' in window ? Notification.permission : 'default');

    const notify = () => {
        void new Notification('Well hello there!', {
            body: 'This is a notification from the Notifications API',
            icon: `${assets}/favicon.png`,
            requireInteraction: true, // https://developer.mozilla.org/en-US/docs/Web/API/Notification/requireInteraction
        });
    };

    const requestPermission = () => {
        Notification.requestPermission()
            .then((result) => {
                permission = result;
                if (result === 'granted') {
                    void new Notification('Permission Granted', {
                        body: 'You can now receive notifications from this site',
                    });
                }
            });
    };
</script>

<ExperimentHeader links={data.experiment.links} />

<ExperimentTitle title="Notifications API">
    <p>
        The Notifications API allows web applications to display notifications to the user.
    </p>
</ExperimentTitle>

<Stone>
    <div class="experiment-container">
        <div class="main-container">
            {#if browser && 'Notification' in window}
                {#if permission === 'denied'}
                    <p>Okay, we will not notify you</p>
                {:else if permission === 'granted'}
                    <Button onclick={notify}>Notify Me</Button>
                {:else}
                    <Button onclick={requestPermission}>Request Permission</Button>
                {/if}
            {:else}
                <p>Notifications are not supported in this browser</p>
            {/if}
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
        justify-content: center;
        align-items: center;
        padding: 3rem;
    }
</style>