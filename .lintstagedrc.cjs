/* jshint esversion: 9 */

module.exports = {
	'*.{js,ts,json,svelte}': ['eslint --fix', 'git add'],
	'*.{md,cjs}': ['prettier --write', 'git add'],
	'*.{jpg,jpeg,png,gif}': ['npm run optimize:image', 'git add'],
};
