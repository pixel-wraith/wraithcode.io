import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth/minimal';
import { sveltekitCookies } from 'better-auth/svelte-kit';

let _auth: ReturnType<typeof betterAuth> | undefined;

function getAuth() {
    if (!_auth) {
        _auth = betterAuth({
            baseURL: env.ORIGIN,
            secret: env.BETTER_AUTH_SECRET,
            database: drizzleAdapter(db, { provider: 'sqlite' }),
            emailAndPassword: { enabled: true },
            socialProviders: {
                github: {
                    clientId: env.GITHUB_CLIENT_ID,
                    clientSecret: env.GITHUB_CLIENT_SECRET,
                },
            },
            plugins: [sveltekitCookies(getRequestEvent)], // make sure this is the last plugin in the array
        });
    }
    return _auth;
}

export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
    get(_, prop) {
        return (getAuth() as any)[prop];
    },
});
