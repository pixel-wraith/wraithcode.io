import { createClient } from '@libsql/client';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

function createDb() {
    if (!env.DATABASE_URL)
        throw new Error('DATABASE_URL is not set');
    if (!env.DATABASE_AUTH_TOKEN)
        throw new Error('DATABASE_AUTH_TOKEN is not set');

    const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });
    return drizzle(client, { schema });
}

export const db = building ? ({} as ReturnType<typeof createDb>) : createDb();
