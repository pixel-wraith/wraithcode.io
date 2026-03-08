import { contentSchema } from '$lib/schemas/contents';
import { z } from 'zod';

const contentsData = [
    {
        id: 'designing-data-intensive-applications',
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        type: 'book' as const,
        url: 'https://dataintensive.net/',
        createdAt: '2025-03-07T00:00:00.000Z',
    },
    {
        id: 'the-pragmatic-programmer',
        title: 'The Pragmatic Programmer',
        author: 'David Thomas & Andrew Hunt',
        type: 'book' as const,
        url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/',
        createdAt: '2025-03-07T00:00:00.000Z',
    },
    {
        id: 'clean-code',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        type: 'book' as const,
        url: 'https://www.oreilly.com/library/view/clean-code-a/9780136083238/',
        createdAt: '2025-03-07T00:00:00.000Z',
    },
    {
        id: 'complete-guide-css-grid',
        title: 'A Complete Guide to CSS Grid',
        author: 'CSS-Tricks',
        type: 'article' as const,
        url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
        createdAt: '2025-03-07T00:00:00.000Z',
    },
    {
        id: 'missing-semester-cs-education',
        title: 'The Missing Semester of Your CS Education',
        author: 'MIT',
        type: 'article' as const,
        url: 'https://missing.csail.mit.edu/',
        createdAt: '2025-03-07T00:00:00.000Z',
    },
];

export const contents = z.array(contentSchema).parse(contentsData);
