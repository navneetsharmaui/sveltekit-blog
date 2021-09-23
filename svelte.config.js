/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* jshint esversion: 9 */

// command env properties
const hasAdapter = process.env.ADAPTER;
const adapt = hasAdapter ? hasAdapter : 'node';

// Imports
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import { createRequire } from 'module';

// Adapters
import staticAdapter from '@sveltejs/adapter-static';
import nodeAdapter from '@sveltejs/adapter-node';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';

// Custom require function as replacement for the require from the commonJS in ES Module
// const customRequire = createRequire(import.meta.url); // jshint ignore:line

// Custom __dirname as replacement for the __dirname from the commonJS in ES Module
const __dirname = dirname(fileURLToPath(import.meta.url)); // jshint ignore:line
// const pkg = customRequire('./package.json');

const options = JSON.stringify(process.env.OPTIONS || '{}');

const getAdapters = (adapt) => {
	switch (adapt) {
		case 'node':
			return nodeAdapter;
		case 'static':
			return staticAdapter;
		case 'netlify':
			return netlifyAdapter;
		case 'vercel':
			return vercelAdapter;
		default:
			return nodeAdapter;
	}
};

const adapter = getAdapters(adapt);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			preserve: ['ld+json'],
		}),
		mdsvex(mdsvexConfig),
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#sveltekit-blog',
		ssr: true,
		prerender: {
			crawl: true,
			enabled: true,
			onError: 'fail',
			entries: ['*'],
		},
		vite: () => ({
			resolve: {
				alias: {
					$stores: resolve(__dirname, './src/stores'),
					$components: resolve(__dirname, './src/lib/shared/components'),
					$ui: resolve(__dirname, './src/lib/shared/ui'),
					$layouts: resolve(__dirname, './src/lib/layouts'),
					$shared: resolve(__dirname, './src/lib/shared'),
					$models: resolve(__dirname, './src/lib/models'),
					$data: resolve(__dirname, './src/lib/data'),
					$core: resolve(__dirname, './src/lib/core'),
					$utils: resolve(__dirname, './src/lib/utils'),
					$environment: resolve(__dirname, './src/environments'),
				},
			},
			envPrefix: ['VITE_', 'SVELTEKIT_BLOG_'],
		}),
	},
};

if (hasAdapter) {
	config.kit.adapter = adapter(options);
}

export default config;
