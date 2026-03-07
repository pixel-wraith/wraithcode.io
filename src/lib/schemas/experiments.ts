import { z } from 'zod';

export const experimentSchema = z.object({
    id: z.string(),
    title: z.string(),
    route: z.string(),
    description: z.string(),
    links: z.array(z.object({
        name: z.string(),
        url: z.string(),
        icon: z.string(),
    })),
    published: z.boolean(),
    createdAt: z.coerce.date(),
});

export type Experiment = z.infer<typeof experimentSchema>;