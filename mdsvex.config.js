/* jshint esversion: 9 */

import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import remarkGfm from 'remark-gfm';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeHighlight from 'rehype-highlight';
import slug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypePrism from 'rehype-prism-plus';

const config = {
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool',
	},

	remarkPlugins: [
		[
			remarkGithub,
			{
				repository: 'https://github.com/navneetsharmaui/sveltekit-blog.git',
			},
		],
		remarkAbbr,
		remarkGfm,
	],
	rehypePlugins: [
		slug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
			},
		],
		rehypePrism,
		rehypeHighlight,
		rehypeAccessibleEmojis,
	],
};

export default config;
