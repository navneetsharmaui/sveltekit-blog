import fs from 'fs';
import frontMatter from 'front-matter';
import marked from 'marked';
import Prism from 'prismjs';
import 'prism-svelte';
import loadLanguages from 'prismjs/components/index.js';
import readingTime from 'reading-time';

loadLanguages(['shell', 'markdown', 'json']);

const blogPath = './contents/blogs';

const posts = fs
	.readdirSync(`${blogPath}`)
	.filter((elem) => !elem.startsWith('.') && !elem.includes('.'))
	.map((postFoldername) => {
		const postContent = fs.readFileSync(`${blogPath}/${postFoldername}/index.md`, {
			encoding: 'utf8',
		});

		const postFrontMatter = frontMatter(postContent);

		const renderer = new marked.Renderer();

		renderer.code = (source, lang: string) => {
			const html = Prism.highlight(source, Prism.languages[lang], lang);
			return `<pre class='language-${lang}'><code class='language-${lang}'>${html}</code></pre>`;
		};

		const html = marked(postFrontMatter.body, { renderer });

		const readingTimeDuration = readingTime(postFrontMatter.body).text;

		return {
			metadata: {
				// @ts-expect-error Spread types may only be created from object types.
				...postFrontMatter.attributes,
				readingTime: readingTimeDuration,
			},
			html: marked(html),
		};
	});

const modifiedPosts = posts
	.filter((post) => post.metadata.published)
	.sort((a, b) =>
		new Date(a.metadata.date).getTime() > new Date(b.metadata.date).getTime()
			? -1
			: new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime()
			? 1
			: 0,
	);

console.log('\x1b[35m[posts] generate\x1b[0m');
export default modifiedPosts;
