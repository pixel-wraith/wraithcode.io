import * as Sentry from '@sentry/sveltekit';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

if (!building) {
    Sentry.init({
        dsn: publicEnv.PUBLIC_SENTRY_DSN,
        environment: env.NODE_ENV,

        tracesSampleRate: env.NODE_ENV === 'production' ? 1.0 : 0.1,

        // Enable logs to be sent to Sentry
        enableLogs: true,

        // uncomment the line below to enable Spotlight (https://spotlightjs.com)
        // spotlight: import.meta.env.DEV,
    });
}