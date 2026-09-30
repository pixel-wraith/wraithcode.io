import { experiments } from '$lib/data/experiments';

export async function load() {
    const latestExperiments = experiments.filter(e => e.published)
        .map(e => ({
            ...e,
            createdAt: new Date(e.createdAt),
        }))
        .sort((a: { createdAt: Date }, b: { createdAt: Date }) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5);

    return {
        experiments: latestExperiments,
    };
}
