/* eslint-disable no-console */
import fs from 'fs';
import frontMatter from 'front-matter';

interface IBlog {
	slug: string;
	title: string;
	author: string;
	published: boolean;
	tags: string[];
	banner?: string;
	bannerCredit?: string;
	canonical?: string;
	date: string;
	description: string;
	edit?: string;
	modified?: string;
	readingTime: string;
}

const convertToSlug = (value: string): string =>
	value
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');

const blogPath = './src/routes/blog';

const posts = fs
	.readdirSync(`${blogPath}`)
	.filter((elem) => !elem.startsWith('.') && !elem.includes('.'))
	.map((postFoldername) => {
		const postContent = fs.readFileSync(`${blogPath}/${postFoldername}/index.md`, {
			encoding: 'utf8',
		});

		const postFrontMatter = frontMatter(postContent);

		return {
			metadata: {
				// @ts-expect-error Spread types may only be created from object types.
				...postFrontMatter.attributes,
			},
		};
	});

const modifiedBlogs: { metadata: IBlog }[] = posts
	.filter((post) => post.metadata.published)
	.sort((a, b) =>
		new Date(a.metadata.date).getTime() > new Date(b.metadata.date).getTime()
			? -1
			: new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime()
			? 1
			: 0,
	);

const pathToWorkspaceJSON = './sveltekit-space.json';

const filterArguments = (argv: string[], flag: string): string[] =>
	argv.filter((value) => value.includes(flag)).map((value) => value.split('=')[1]);

const getArguments = (argv: string[], flag: string): string =>
	filterArguments(argv, flag) ? filterArguments(argv, flag).reduce((value) => value) : '';

const writeToFile = (filePath: string, data): void => fs.writeFileSync(filePath, data);

const processArguments = process.argv;

const project = getArguments(processArguments, '--project');

const workspace = JSON.parse(
	fs.readFileSync(pathToWorkspaceJSON, {
		encoding: 'utf8',
	}),
);

const root = workspace['projects'][project]['root'];
const routes = workspace['projects'][project]['routes'];
const assets = workspace['projects'][project]['assets'];

const URL = process.env.SVELTEKIT_BLOG_BASE_URL;
const BASE_URL = URL ? URL : 'https://sveltekit-blog-starter.vercel.app';
const pages = [''];

fs.readdirSync(`${root}/${routes}`).forEach((file) => {
	file = file.split('.')[0];

	if (file.charAt(0) !== '_' && file !== 'sitemap' && file !== 'index' && file !== 'api' && file !== 'rss') {
		pages.push(file);
	}
});

const generateTags = () => {
	let listWithDuplicatetags: string[] = [];

	modifiedBlogs
		.map((post) => post.metadata)
		.forEach((blog: IBlog) => {
			listWithDuplicatetags =
				listWithDuplicatetags.length === 0 ? [...blog.tags] : [...listWithDuplicatetags, ...blog.tags];
		});

	const tags = [...new Set(listWithDuplicatetags)];

	return tags
		.map(
			(uniqueCategory: string) => `
      <url><loc>${BASE_URL}/tags/${convertToSlug(uniqueCategory)}/</loc><priority>0.85</priority></url>
        `,
		)
		.join('\n');
};

const render = (pages: string[], posts: { metadata: IBlog }[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
		.map(
			(page: string) => `
    <url><loc>${BASE_URL}/${page ? `${page}/` : ''}</loc><priority>0.85</priority></url>
  `,
		)
		.join('\n')}
  ${posts
		.map((post) => post.metadata)
		.map(
			(value: IBlog) => `
    <url>
      <loc>${BASE_URL}/blog/${value.slug}/</loc>
      <priority>0.69</priority>
    </url>
  `,
		)
		.join('\n')}
    ${generateTags()}
</urlset>
`;

const sitemap = render(pages, modifiedBlogs);

writeToFile(`${root}/${assets}/sitemap.xml`, sitemap);
