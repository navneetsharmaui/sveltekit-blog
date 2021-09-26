/* eslint-disable no-console */
import type { IBlog } from '$models/interfaces/iblog.interface';
import { convertToSlug } from '$utils/convert-to-slug';
import fs from 'fs';
import frontMatter from 'front-matter';
import marked from 'marked';
import Prism from 'prismjs';
import 'prism-svelte';
import loadLanguages from 'prismjs/components/index.js';
import { readingTime } from '$lib/utils/reading-time';

loadLanguages(['shell', 'markdown', 'json']);

const blogPath = './contents/blogs';
const createAnchorAndFragment = (text: string) => {
	const anchorRegExp = /{([^}]+)}/g;
	const anchorOverwrite = anchorRegExp.exec(text);
	const fragment = anchorOverwrite
		? anchorOverwrite[0].substring(2, anchorOverwrite[0].length - 1)
		: convertToSlug(text);

	return { anchor: `#${fragment}`, fragment };
};

const posts = fs
	.readdirSync(`${blogPath}`)
	.filter((elem) => !elem.startsWith('.') && !elem.includes('.'))
	.map((postFoldername) => {
		const postContent = fs.readFileSync(`${blogPath}/${postFoldername}/index.md`, {
			encoding: 'utf8',
		});

		const postFrontMatter = frontMatter(postContent);

		const renderer = new marked.Renderer({
			gfm: true,
			breaks: true,
			headerIds: true,
		});

		renderer.code = (source, lang: string) => {
			const html = Prism.highlight(source, Prism.languages[lang], lang);
			return `<pre class='language-${lang}'><code class='language-${lang}'>${html}</code></pre>`;
		};
		renderer.heading = (text, level, rawtext) => {
			const headingText = text.includes('{') ? text.substring(0, text.indexOf('{') - 1) : text;

			const { fragment } = createAnchorAndFragment(rawtext);
			if (!fragment) {
				return `<h${level}>${headingText}</h${level}>`;
			}

			return `<h${level} id="${fragment}"><a href="#${fragment}" class="anchor">${headingText}</a></h${level}>`;
		};
		const html = marked(postFrontMatter.body, { renderer });

		const readingTimeDuration = readingTime(postFrontMatter.body).time;

		return {
			metadata: {
				// @ts-expect-error Spread types may only be created from object types.
				...postFrontMatter.attributes,
				readingTime: readingTimeDuration,
			},
			html: marked(html),
		};
	});

const modifiedBlogs: { html: string; metadata: IBlog }[] = posts
	.filter((post) => post.metadata.published)
	.sort((a, b) =>
		new Date(a.metadata.date).getTime() > new Date(b.metadata.date).getTime()
			? -1
			: new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime()
			? 1
			: 0,
	);

console.log('\x1b[35m[blogs] generate\x1b[0m');
export default modifiedBlogs;
