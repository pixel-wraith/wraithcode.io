import { error } from '@sveltejs/kit';
import { loadExperiment } from '$lib/data/experiments';

export async function load() {
    const experiment = loadExperiment('promise-try');

    if (!experiment) {
        throw error(404, 'Experiment not found');
    }

    return {
        experiment,
    };
}
