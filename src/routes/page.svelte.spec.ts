import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import Page from './+page.svelte';

const data = {
    experiments: [
        {
            id: 'test-experiment',
            title: 'Test Experiment',
            route: '/experiments/test-experiment',
            description: 'An experiment for the test.',
            links: [],
            published: true,
            createdAt: new Date('2026-01-01T00:00:00.000Z'),
        },
    ],
};

describe('/+page.svelte', () => {
    it('should render h1', async () => {
        render(Page, { data });

        const heading = page.getByRole('heading', { level: 1 });
        await expect.element(heading).toBeInTheDocument();
    });
});
