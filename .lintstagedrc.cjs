/* jshint esversion: 9 */

module.exports = {
	'*.{js,ts,json,svelte}': ['npm run format', 'git add'],
	'*.{jpg,jpeg,png,gif}': ['npm run optimize:image', 'git add'],
};
