import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

let _db: ReturnType<typeof drizzle> | undefined;

export function getDb() {
    if (!_db) {
        if (!env.DATABASE_URL)
            throw new Error('DATABASE_URL is not set');
        if (!env.DATABASE_AUTH_TOKEN)
            throw new Error('DATABASE_AUTH_TOKEN is not set');

        const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });
        _db = drizzle(client, { schema });
    }
    return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
    get(_, prop) {
        return (getDb() as any)[prop];
    },
});
