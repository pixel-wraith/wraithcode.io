import { contents } from '$lib/data/contents';

export async function load() {
    const allContents = contents
        .map(c => ({
            ...c,
            createdAt: new Date(c.createdAt),
        }))
        .sort((a: { createdAt: Date }, b: { createdAt: Date }) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
        contents: allContents,
    };
}
