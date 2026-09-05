const experiments = [
    {
        id: 'particle-generation',
        title: 'Particle Generation',
        route: '/experiments/whimsical-animations/particles/particle-generation',
        description: 'A simple like button with simple particles.',
        links: [],
        published: true,
        createdAt: '2026-09-04T00:00:01.000Z',
    },
    {
        id: 'falling-particles',
        title: 'Falling Particles',
        route: '/experiments/whimsical-animations/particles/falling-particles',
        description: '',
        links: [],
        published: true,
        createdAt: '2026-09-04T00:00:01.000Z',
    },
];

export async function load() {
    return {
        experiments: experiments.map(e => ({
            ...e,
            createdAt: new Date(e.createdAt),
        }))
            .sort((a: { createdAt: Date }, b: { createdAt: Date }) => {
                return b.createdAt.getTime() - a.createdAt.getTime();
            }),
    };
}
