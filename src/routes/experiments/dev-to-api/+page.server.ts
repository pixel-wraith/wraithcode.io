import type { IBlogPost } from '$lib/types/blog';

import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { experiments } from '$lib/data/experiments';
import { logger } from '$lib/logger';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    let articles: IBlogPost[] = [];

    try {
        /**
         * Fetch my 5 latest published articles from dev.to
         *
         * ℹ️ We are doing this on the server-side because authenticated
         * endpoints are CORS disabled...meaning we cannot make them from
         * the browser.
         */
        const res = await fetch('https://dev.to/api/articles/me/published?per_page=5', {
            headers: {
                /**
                 * ℹ️ This is my secret API key. It's been stored in a .env file
                 * and imported here. This is a server-side file, so it's safe to
                 * store it here.
                 */
                'api-key': env.DEV_TO_API_KEY as string,
            },
        });

        articles = await res.json() as IBlogPost[];
    } catch (err) {
        logger.error('Failed to fetch articles', { error: err });
        throw error(500, 'Failed to fetch articles');
    }

    const experiment = experiments
        .filter(e => e.published)
        .map(e => ({
            ...e,
            createdAt: new Date(e.createdAt),
        }))
        .find(e => e.id === 'dev-to-api');

    if (!experiment) {
        logger.error('Experiment not found', { experimentId: 'dev-to-api' });
        throw error(404, 'Experiment not found');
    }

    return { articles, experiment };
};
