import * as Sentry from '@sentry/sveltekit';
import { NODE_ENV } from '$env/static/private';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';

Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: NODE_ENV,

    tracesSampleRate: NODE_ENV === 'production' ? 1.0 : 0.1,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: import.meta.env.DEV,
});