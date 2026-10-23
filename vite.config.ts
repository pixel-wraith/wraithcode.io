import type { Plugin } from 'vite';

import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// Wrangler bundles the server build into one file, `_worker.js`. The deploy
// workflow uploads the source map of that file to Sentry. Thus, the server
// build must keep its source maps and must not get Sentry debug IDs.
async function sentryPlugins(): Promise<Plugin[]> {
    const plugins = await sentrySvelteKit({
        org: 'wraith',
        project: 'wraithcode',
        sourcemaps: {
            // Cloudflare serves `.svelte-kit/cloudflare` to the public. Do not
            // delete the server source maps, because Wrangler reads them.
            filesToDeleteAfterUpload: ['./.svelte-kit/cloudflare/**/*.map'],
        },
    });

    // `sentry-vite-plugin` adds a debug ID to each chunk in `renderChunk`.
    // In `_worker.js`, all of these debug IDs are for the same file, and
    // Sentry then uses a source map that does not match.
    const debugIdPlugin = plugins.find(plugin => plugin.name === 'sentry-vite-plugin');
    const renderChunk = debugIdPlugin?.renderChunk;

    if (!debugIdPlugin || typeof renderChunk !== 'function') {
        throw new Error('Cannot find the renderChunk hook of sentry-vite-plugin.');
    }

    debugIdPlugin.renderChunk = function (...args) {
        if (this.environment.config.consumer === 'server') {
            return null;
        }

        return renderChunk.apply(this, args);
    };

    return plugins;
}

// esbuild in Wrangler follows `//# sourceMappingURL=` comments to the source
// maps of the server build. Thus, the server build needs these comments. The
// client build keeps hidden source maps, because Cloudflare serves it to the
// public. SvelteKit sets `build.ssr` in its `config` hook, thus this plugin
// must run after SvelteKit.
const serverSourceMaps: Plugin = {
    name: 'server-source-maps',
    apply: 'build',
    enforce: 'post',
    config: config => ({ build: { sourcemap: config.build?.ssr ? true : 'hidden' } }),
};

export default defineConfig({
    plugins: [sentryPlugins(), sveltekit(), serverSourceMaps],
    test: {
        expect: { requireAssertions: true },
        projects: [
            {
                extends: './vite.config.ts',
                test: {
                    name: 'client',
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium', headless: true }],
                    },
                    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                    exclude: ['src/lib/server/**'],
                },
            },

            {
                extends: './vite.config.ts',
                test: {
                    name: 'server',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,ts}'],
                    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                },
            },
        ],
    },
});
