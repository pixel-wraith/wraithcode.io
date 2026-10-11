import * as Sentry from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

// SvelteKit does not let code read $env/dynamic/* while it prerenders pages.
export const handle = building
    ? Sentry.sentryHandle()
    : sequence(
            Sentry.initCloudflareSentryHandle({
                dsn: publicEnv.PUBLIC_SENTRY_DSN,
                environment: env.NODE_ENV,
                tracesSampleRate: env.NODE_ENV === 'production' ? 1.0 : 0.1,
                enableLogs: true,
            }),
            Sentry.sentryHandle(),
        );

export const handleError = Sentry.handleErrorWithSentry();
