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
const assets = workspace['projects'][project]['assets'];

const URL = process.env.SVELTEKIT_BLOG_BASE_URL;
const BASE_URL = URL ? URL : 'https://sveltekit-blog-starter.vercel.app';

const renderXmlRssFeed = (blogs: { metadata: IBlog }[]): string => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title><![CDATA[Navneet Sharma - On your side for your site]]></title>
    <description><![CDATA[Personal website and blog written from scratch with SvelteKit and TailwindCSS.]]></description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>SvelteKit</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogs
		.map((post) => post.metadata)
		.map(
			(value: IBlog) => `
    <item>
      <title><![CDATA[${value.title}]]></title>
      <description><![CDATA[${value.description}]]></description>
      <link>${BASE_URL}/blog/${value.slug}</link>
      <guid isPermaLink="false">${BASE_URL}/blog/${value.slug}</guid>
      <pubDate>${new Date(value.date).toUTCString()}</pubDate>
    </item>
    `,
		)
		.join('\n')}
  </channel>
</rss>`;

const rss = renderXmlRssFeed(modifiedBlogs);

writeToFile(`${root}/${assets}/rss.xml`, rss);
