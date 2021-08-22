/* jshint esversion: 9 */

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			listStyleType: ['hover', 'focus'],
			listStylePosition: ['hover', 'focus'],
		},
	},
	plugins: [],
};

module.exports = config;
