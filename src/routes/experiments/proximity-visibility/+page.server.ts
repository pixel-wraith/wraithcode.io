import { error } from '@sveltejs/kit';
import { experiments } from '$lib/data/experiments';

export async function load() {
    const experiment = experiments
        .filter(e => e.published)
        .map(e => ({
            ...e,
            createdAt: new Date(e.createdAt),
        }))
        .find(e => e.id === 'proximity-visibility');

    if (!experiment) {
        throw error(404, 'Experiment not found');
    }

    return {
        experiment,
    };
}
