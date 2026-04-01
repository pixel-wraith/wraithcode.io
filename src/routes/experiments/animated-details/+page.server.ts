import { error } from '@sveltejs/kit';
import { loadExperiment } from '$lib/data/experiments';

export async function load() {
    const experiment = loadExperiment('animated-details');

    if (!experiment) {
        throw error(404, 'Experiment not found');
    }

    return {
        experiment,
    };
}
