import blogs from './blog/_blog-api';
import type { IBlog } from '$models/interfaces/iblog.interface';
import { environment } from '$environment/environment';

const siteUrl = `${environment.launchURL}`.trim().slice();

const renderXmlRssFeed = (
	blogs: { html: string; metadata: IBlog }[],
): string => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title><![CDATA[Sveltekit Blogger - On your side for your site]]></title>
    <description><![CDATA[Personal website and blog written from scratch with SvelteKit and TailwindCSS.]]></description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>SvelteKit</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogs
		.map((post) => post.metadata)
		.map(
			(value: IBlog) => `
    <item>
      <title><![CDATA[${value.title}]]></title>
      <description><![CDATA[${value.description}]]></description>
      <link>${siteUrl}/blog/${value.slug}</link>
      <guid isPermaLink="false">${siteUrl}/blog/${value.slug}</guid>
      <pubDate>${new Date(value.date).toUTCString()}</pubDate>
    </item>
    `,
		)
		.join('\n')}
  </channel>
</rss>`;

export function get(): { body: string } {
	const feed = renderXmlRssFeed(blogs);

	return {
		body: feed,
	};
}
