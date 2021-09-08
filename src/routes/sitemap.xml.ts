import fs from 'fs';

import posts from './blog/_blog-api';
import type { IBlog } from '$models/interfaces/iblog.interface';
import { convertToSlug } from '$utils/convert-to-slug';
import { environment } from '$environment/environment';

const BASE_URL = `${environment.launchURL}`.trim().slice();
const pages: string[] = [''];

fs.readdirSync('./src/routes').forEach((file) => {
	file = file.includes('.') ? file.split('.')[0] : file;
	if (file.charAt(0) !== '_' && file !== 'sitemap' && file !== 'index' && file !== 'api' && file !== 'rss') {
		pages.push(file);
	}
});

const generateTags = () => {
	let listWithDuplicatetags: string[] = [];

	posts
		.map((post) => post.metadata)
		.forEach((blog: IBlog) => {
			listWithDuplicatetags =
				listWithDuplicatetags.length === 0 ? [...blog.tags] : [...listWithDuplicatetags, ...blog.tags];
		});

	const tags = [...new Set(listWithDuplicatetags)];

	return tags
		.map(
			(uniqueCategory: string) => `
      <url><loc>${BASE_URL}/bog/tags/${convertToSlug(uniqueCategory)}/</loc><priority>0.85</priority></url>
        `,
		)
		.join('\n');
};
//
const render = (pages: string[], posts: { html: string; metadata: IBlog }[]) => `<?xml version="1.0" encoding="UTF-8" ?>
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

export function get(): { body: string } {
	const sitemap = render(pages, posts);

	return {
		body: sitemap,
	};
}
