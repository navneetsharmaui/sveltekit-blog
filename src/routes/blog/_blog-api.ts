import fs from 'fs';
import frontMatter from 'front-matter';
import marked from 'marked';
import Prism from 'prismjs';
import 'prism-svelte';
import loadLanguages from 'prismjs/components/index.js';
import readingTime from 'reading-time';

loadLanguages(['shell', 'markdown', 'json']);

const posts = fs
	.readdirSync('./contents/blogs')
	.filter((elem) => elem.endsWith('.md'))
	.map((postFilename) => {
		const postContent = fs.readFileSync(`./contents/blogs/${postFilename}`, {
			encoding: 'utf8',
		});

		const postFrontMatter = frontMatter(postContent);

		const renderer = new marked.Renderer();

		renderer.code = (source, lang: string) => {
			console.log('Lang', lang);
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

export default modifiedPosts;
