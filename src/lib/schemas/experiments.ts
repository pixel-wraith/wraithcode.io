import { z } from 'zod';

export const experimentLinkSchema = z.object({
    name: z.string(),
    url: z.string(),
    icon: z.string(),
});

export const experimentSchema = z.object({
    id: z.string(),
    title: z.string(),
    route: z.string(),
    description: z.string(),
    links: z.array(experimentLinkSchema),
    published: z.boolean(),
    createdAt: z.coerce.date(),
});

export type Experiment = z.infer<typeof experimentSchema>;