import { experimentSchema } from '$lib/schemas/experiments';
import { z } from 'zod';

const EXPERIMENTS_GITHUB_URL = 'https://github.com/wraithcode/experiments';

const experimentsData = [
    {
        id: 'orphans',
        title: 'Orphans',
        route: '/experiments/orphans',
        description: 'Learning how to use the CSS orphans property.',
        links: [
            {
                name: 'View on Github',
                url: `${EXPERIMENTS_GITHUB_URL}/orphans`,
                icon: 'fa-brands fa-github',
            },
        ],
        published: true,
        createdAt: '2025-03-23T01:41:01.000Z',
    },
    {
        id: 'gradient-text',
        title: 'Gradient Text',
        route: '/experiments/gradient-text',
        description: 'A simple gradient text effect using only CSS.',
        links: [
            {
                name: 'View on Github',
                url: `${EXPERIMENTS_GITHUB_URL}/gradient-text`,
                icon: 'fa-brands fa-github',
            },
        ],
        published: true,
        createdAt: '2025-03-21T14:30:01.000Z',
    },
    {
        id: 'loading-animations-1',
        title: 'Having Fun with Loading Animations',
        route: '/experiments/loading-animations-1',
        description: 'had some free time, so I thought I\'d play around with loading animation ideas.',
        links: [
            {
                name: 'View on Github',
                url: `${EXPERIMENTS_GITHUB_URL}/loading-animations-1`,
                icon: 'fa-brands fa-github',
            },
        ],
        published: true,
        createdAt: '2024-11-30T01:04:01.000Z',
    },
    {
        id: 'paint-order',
        title: 'Improve Text by Changing the Paint Order',
        route: '/experiments/paint-order',
        description: 'Playing around with the paint order of text to see how it changes the rendering and makes the text look different.',
        links: [
            {
                name: 'View on Github',
                url: `${EXPERIMENTS_GITHUB_URL}/paint-order`,
                icon: 'fa-brands fa-github',
            },
            {
                name: 'Documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order',
                icon: 'fa-solid fa-book',
            },
        ],
        published: true,
        createdAt: '2024-11-26T00:34:01.000Z',
    },
    {
        id: 'notifications-api',
        title: 'Using the Notifications API',
        route: '/experiments/notifications-api',
        description: 'A bare-bones example of using the Notifications API to display notifications.',
        links: [
            {
                name: 'View on Github',
                url: `${EXPERIMENTS_GITHUB_URL}/notifications-api`,
                icon: 'fa-brands fa-github',
            },
            {
                name: 'Documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Notification',
                icon: 'fa-solid fa-book',
            },
        ],
        published: true,
        createdAt: '2024-09-29T14:53:01.000Z',
    },
    {
        id: 'indexdb',
        title: 'Working with the IndexedDB API',
        route: '/experiments/indexdb',
        description: 'A small experiment to work with the IndexedDB API and learn how to use it.',
        links: [
            {
                name: 'View on Github',
                url: `${EXPERIMENTS_GITHUB_URL}/indexdb`,
                icon: 'fa-brands fa-github',
            },
            {
                name: 'Documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
                icon: 'fa-solid fa-book',
            },
        ],
        published: true,
        createdAt: '2024-09-28T04:25:01.000Z',
    },
    {
        id: 'html-details',
        title: 'Styling and animating the <details> element',
        route: '/experiments/html/details',
        description: 'Playing around with the <details> element to see what can be done with it.',
        links: [
            {
                name: 'View on Github',
                url: `${EXPERIMENTS_GITHUB_URL}/html/details`,
                icon: 'fa-brands fa-github',
            },
            {
                name: 'Documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details',
                icon: 'fa-solid fa-book',
            },
        ],
        published: true,
        createdAt: '2024-09-05T16:21:01.000Z',
    },
    {
        id: 'dev-to-api',
        title: 'Let\'s Play with the DEV API',
        route: '/experiments/dev-to-api',
        description: 'This is a little snippet used in one of my blog posts to illustrate how to work with the dev.to API.',
        links: [
            {
                name: 'View on Github',
                url: `${EXPERIMENTS_GITHUB_URL}/dev-to-api`,
                icon: 'fa-brands fa-github',
            },
            {
                name: 'Documentation',
                url: 'https://developers.forem.com/api',
                icon: 'fa-solid fa-book',
            },
        ],
        published: true,
        createdAt: '2024-06-21T04:00:01.000Z',
    },
];

export const experiments = z.array(experimentSchema).parse(experimentsData);