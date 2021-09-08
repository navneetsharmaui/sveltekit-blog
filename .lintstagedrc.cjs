/* jshint esversion: 9 */

module.exports = {
	'*.{js,ts,json,svelte}': ['npm run format', 'git add'],
	'./src/**/*.{svelte,ts}': ['npm run format', 'npm run lint:fix'],
	'./.{ts,cjs,js}': ['npm run lint:fix'],
	'*.{jpg,jpeg,png,gif}': ['npm run optimize:image', 'git add'],
};
