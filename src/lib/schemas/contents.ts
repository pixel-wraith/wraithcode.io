import { z } from 'zod';

export const ContentTypes = {
    BOOK: 'book',
    ARTICLE: 'article',
    VIDEO: 'video',
    PODCAST: 'podcast',
    COURSE: 'course',
} as const;

export const contentTypes = Object.values(ContentTypes);

export const contentSchema = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    type: z.enum(contentTypes),
    url: z.string(),
    description: z.string().optional(),
    createdAt: z.coerce.date(),
});

export type Content = z.infer<typeof contentSchema>;