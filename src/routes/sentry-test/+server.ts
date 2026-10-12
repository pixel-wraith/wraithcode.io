// TEMPORARY: This route sends a test error to Sentry. Remove it after the test (see #5).
export const prerender = false;

export function GET() {
    throw new Error('Sentry test from Workers');
}
