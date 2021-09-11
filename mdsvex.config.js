/* jshint esversion: 9 */

import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import remarkGfm from 'remark-gfm';

import slug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import rehypeHighlight from 'rehype-highlight';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

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
		rehypePrism,
		rehypeHighlight,
		rehypeCodeTitles,
		rehypeAccessibleEmojis,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				properties: {
					class: 'anchor',
				},
			},
		],
	],
	layout: {
		blog: './src/lib/layouts/blog-layout/BlogLayout.svelte',
		snippet: './src/lib/layouts/snippets-layout/SnippetsLayout.svelte',
		newsletter: './src/lib/layouts/newsletter-layout/NewsLetterLayout.svelte',
		_: './src/lib/layouts/blog-layout/BlogLayout.svelte',
	},
};

export default config;
