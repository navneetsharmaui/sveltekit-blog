import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createHash } from 'crypto';
import marked from 'marked';
import highlightCode from 'gatsby-remark-prismjs/highlight-code.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-textile.js';
import 'prismjs/components/prism-graphql.js';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-diff.js';
import 'prismjs/components/prism-csharp.js';
import 'prismjs/components/prism-sql.js';
import readingTime from 'reading-time';

import { ISODate } from '$utils/date-formatters';
import { environment } from '$environment/environment';

const blogPath = 'contents/blogs';
const snippetsPath = 'contents/snippets';
const blogEditPath = `${environment.gitHubConfig.GITHUB_BLOG_EDIT_URL}`.trim().slice();
const langs = {
	bash: 'bash',
	sh: 'bash',
	html: 'markup',
	sv: 'markup',
	js: 'javascript',
	ts: 'typescript',
	json: 'json',
	css: 'css',
	txt: 'textile',
	graphql: 'graphql',
	yml: 'yaml',
	diff: 'diff',
	cs: 'csharp',
	sql: 'sql',
	svelte: 'svelte',
};

export const posts = readPosts();
// export const snippets = readSnippets();

export function readPosts(): {
	html: string;
	tldr: string;
	metadata: {
		title: string;
		slug: string;
		description: string;
		author: string;
		date: string;
		modified: string;
		tags: string[];
		banner: string;
		bannerCredit: string;
		published: boolean;
		canonical: string;
		edit: string;
		outgoingLinks: { slug: string; title: string }[];
		incomingLinks: { slug: string; title: string }[];
	};
}[] {
	console.log('\x1b[35m[posts] generate\x1b[0m');

	const folderContent = [...traverseFolder(blogPath, '.md')];
	const directories = folderContent.reduce((dirs, file) => {
		dirs[file.folder] = [...(dirs[file.folder] || []), { path: file.path, file: file.file }];
		return dirs;
	}, {} as { [directory: string]: { file: string; path: string }[] });

	const postsSorted = Object.values(directories)
		.map((files) => {
			const postPath = files.find((f) => f.file === 'index.md').path;
			const tldrPath = files.find((f) => f.file === 'tldr.md')?.path;

			const { html, metadata } = parseFileToHtmlAndMeta(postPath, {
				createAnchorAndFragment: (_level, _metadata, text) => {
					const anchorRegExp = /{([^}]+)}/g;
					const anchorOverwrite = anchorRegExp.exec(text);
					const fragment = anchorOverwrite
						? anchorOverwrite[0].substring(2, anchorOverwrite[0].length - 1)
						: slugify(text);

					return { anchor: `#${fragment}`, fragment };
				},
			});
			const { html: tldr } = tldrPath
				? parseFileToHtmlAndMeta(tldrPath, {
						createAnchorAndFragment: (_level, _metadata, text) => {
							const anchorRegExp = /{([^}]+)}/g;
							const anchorOverwrite = anchorRegExp.exec(text);
							const fragment = anchorOverwrite
								? anchorOverwrite[0].substring(2, anchorOverwrite[0].length - 1)
								: slugify(text);

							return { anchor: `#${fragment}`, fragment };
						},
				  })
				: { html: null };

			// disable in dev because this slows down 😪
			const modified = import.meta.env.DEV ? '' : getLastModifiedDate(postPath);
			const published = metadata.published === 'true';
			const tags = metadata.tags
				.split(',')
				.map((p) => (p ? p.trim().charAt(0).toUpperCase() + p.trim().slice(1) : p));
			const banner = `/images/blogs/${metadata.slug}/banner.jpg`;

			const canonical = path
				.normalize(path.join('', 'blog', metadata.slug))
				.replace(/\\/g, '/')
				.replace('/', '//');

			const edit = `${blogEditPath}/${metadata.slug}/index.md`;
			return {
				html,
				tldr,
				metadata: {
					...metadata,
					date: ISODate(metadata.date),
					modified: ISODate(modified),
					published,
					tags,
					banner,
					canonical,
					edit,
					outgoingLinks: [],
					incomingLinks: [],
				},
			};
		})
		.sort(sortByDate);

	for (const post of postsSorted) {
		const incomingLinks = new Set([
			...postsSorted
				.filter((p) => p.metadata.outgoingSlugs.includes(post.metadata.slug))
				.map((p) => ({
					slug: p.metadata.slug,
					title: p.metadata.title,
				})),
		]);

		const outgoingLinks = new Set([
			...postsSorted
				.filter((p) => post.metadata.outgoingSlugs.includes(p.metadata.slug))
				.map((p) => ({
					slug: p.metadata.slug,
					title: p.metadata.title,
				})),
		]);

		post.metadata.incomingLinks.push(...incomingLinks);
		post.metadata.outgoingLinks.push(...outgoingLinks);
	}
	return postsSorted;
}

// export function readSnippets(): {
// 	html: string;
// 	metadata: {
// 		title: string;
// 		slug: string;
// 		author: string;
// 		date: string;
// 		tags: string[];
// 		url: string;
// 	};
// }[] {
// 	console.log('\x1b[35m[snippets] generate\x1b[0m');

// 	const folderContent = [...traverseFolder(snippetsPath, '.md')];
// 	return folderContent
// 		.map(({ path }) => {
// 			const { html, metadata } = parseFileToHtmlAndMeta(path, {
// 				createAnchorAndFragment: (level, metadata) =>
// 					level == 2
// 						? {
// 								anchor: `snippets/${metadata.slug}`,
// 								fragment: metadata.slug,
// 						  }
// 						: {},
// 				createHeadingParts: (metadata) => {
// 					return [
// 						metadata.image ? `<a href="/${metadata.image}" download>Download</a>` : '',
// 						metadata.image
// 							? `<a
// 				target="_blank"
// 				rel="external"
// 				href="https://twitter.com/intent/tweet?text=${metadata.title}&via=tim_deschryver&url=${
// 									import.meta.env.VITE_PUBLIC_BASE_PATH
// 							  }/snippets/${metadata.slug}">Share</a>`
// 							: '',
// 					];
// 				},
// 			});
// 			const tags = metadata.tags.split(',').map((p) => (p ? p.trim() : p));
// 			const image = `${import.meta.env.VITE_PUBLIC_BASE_PATH}/${metadata.image}`;
// 			const url = `/snippets/${metadata.slug}`;

// 			return {
// 				html,
// 				metadata: {
// 					...metadata,
// 					date: ISODate(metadata.date),
// 					tags,
// 					image,
// 					url,
// 				},
// 			};
// 		})
// 		.sort(sortByDate);
// }

function parseFileToHtmlAndMeta(
	file,
	{
		createAnchorAndFragment = () => {
			// noop
		},
		createHeadingParts = () => [],
	}: any,
): { html: string; metadata: any & { outgoingSlugs: string[] }; assetsSrc: string } {
	const markdown = fs.readFileSync(file, 'utf-8');
	const { content, metadata } = extractFrontmatter(markdown);
	metadata.outgoingSlugs = [] as string[];
	const assetsSrc = path.dirname(file);
	const renderer = new marked.Renderer();
	// const tweetRegexp = /https:\/\/twitter\.com\/[A-Za-z0-9-_]*\/status\/[0-9]+/i;
	renderer.link = (href, title, text) => {
		// TODO: twitter links
		// if (tweetRegexp.test(href)) {
		//   const fetchResult = require("sync-fetch")(
		//     `https://publish.twitter.com/oembed?url=${href}&align=center`
		//   ).json();
		//   return `<div>${fetchResult.html}</div>`;
		// }

		const href_attr = `href="${href}"`;
		const title_attr = title ? `title="${title}"` : '';
		const internal = href.startsWith('/');
		const prefetch_attr = internal ? `prefetch="true"` : '';
		const rel_attr = internal || href.startsWith('#') ? `` : 'rel="external"';
		const attributes = [href_attr, title_attr, prefetch_attr, rel_attr].filter(Boolean).join(' ');

		if (internal) {
			const outgoingSlug = href.split('/').pop();
			if (metadata.slug !== outgoingSlug) {
				metadata.outgoingSlugs.push(outgoingSlug);
			}
		}

		return `<a ${attributes}>${text}</a>`;
	};

	renderer.image = (href, _title, text) => {
		const src = href.startsWith('http')
			? href
			: '/' +
			  path
					.join(assetsSrc, href)
					.split(path.sep)
					.filter((_, index, { length }) => index >= length - 4)
					.join('/');

		return `
			<figure>
				<img src="${src}" alt="" loading="lazy"/>
				<figcaption>${text}</figcaption>
			</figure>
		`;
	};

	renderer.code = (source, lang) => {
		lang = lang || 'txt';

		const lineIndex = lang.indexOf('{');
		const fileIndex = lang.indexOf(':');

		const language =
			lineIndex !== -1 || fileIndex !== -1
				? lang.substring(0, Math.min(...[lineIndex, fileIndex].filter((i) => i !== -1))).trim()
				: lang;
		const prismLanguage = langs[language];
		const file = fileIndex !== -1 ? lang.substr(lang.indexOf(':') + 1).trim() : '';

		const lineNumberRegExp = /{([^}]+)}/g;
		const linesHighlight = [];
		let curMatch;
		while ((curMatch = lineNumberRegExp.exec(lang))) {
			const parts = curMatch[1].split(',');
			parts.forEach((p) => {
				let [min, max] = p.split('-').map(Number);
				max = max || min;
				while (min <= max) {
					linesHighlight.push(min++);
				}
			});
		}

		const id = createHash('md5').update(source).digest('hex');

		if (!prismLanguage) {
			console.warn('did not found a language for: ' + language);
			return `<pre id="${id}" class='language-text' aria-hidden="true" tabindex="-1"><code>${source}</code></pre>`;
		}

		const highlightedLines = highlightCode(prismLanguage, source, {}, linesHighlight);

		const highlighted = highlightedLines
			.replace(/gatsby-highlight-code-line/g, 'line-highlight')
			// add space to render the line
			.replace(/<span class="line-highlight"><\/span>/g, '<span class="line-highlight"> </span>');

		const codeBlock = `<code>${highlighted}</code>`;
		const headingParts = [
			file ? `<span class="file">${file}</span>` : undefined,
			...createHeadingParts(metadata),
		].filter(Boolean);
		const heading = headingParts.length ? `<div class="code-heading">${headingParts.join(' • ')}</div>` : '';
		return `<pre id="${id}" class='language-${prismLanguage}' aria-hidden="true" tabindex="-1">${heading}${codeBlock}</pre>`;
	};

	renderer.codespan = (source) => {
		return `<code class="language-text">${source}</code>`;
	};

	renderer.heading = (text, level, rawtext) => {
		const headingText = text.includes('{') ? text.substring(0, text.indexOf('{') - 1) : text;

		const { fragment } = createAnchorAndFragment(level, metadata, rawtext);
		if (!fragment) {
			return `<h${level}>${headingText}</h${level}>`;
		}

		return `
		<h${level} id="${fragment}">
		  <a href="#${fragment}" class="anchor" tabindex="-1">${headingText}</a>
		</h${level}>`;
	};

	const html = marked(
		content.replace(/^\t+/gm, (match) => match.split('\t').join('  ')),
		{ renderer },
	);

	return {
		html,
		metadata: {
			...metadata,
			readingTime: readingTime(content).text,
		},
		assetsSrc,
	};
}

export function* traverseFolder(
	folder: string,
	extension = '.md',
): Generator<{ folder: string; file: string; path: string }> {
	const folders = fs.readdirSync(folder, { withFileTypes: true }) as fs.Dirent[];
	for (const folderEntry of folders) {
		if (folderEntry.name.includes('node_modules')) {
			// ignore folder
			continue;
		}
		const entryPath = path.resolve(folder, folderEntry.name);
		if (folderEntry.isDirectory()) {
			yield* traverseFolder(entryPath, extension);
		} else if (path.extname(entryPath) === extension) {
			yield { folder, file: folderEntry.name, path: entryPath };
		}
	}
}

function extractFrontmatter(markdown): { content: string; metadata: any } {
	const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown);
	const frontMatter = match ? match[1] : '';
	const content = match ? markdown.slice(match[0].length) : markdown;

	const metadata = frontMatter.split('\n').reduce((data, pair) => {
		const colonIndex = pair.indexOf(':');
		data[pair.slice(0, colonIndex).trim()] = pair.slice(colonIndex + 1).trim();
		return data;
	}, {});

	return { metadata, content };
}

function slugify(string) {
	const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
	const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
	const p = new RegExp(a.split('').join('|'), 'g');

	return string
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w-]+/g, '') // Remove all non-word characters
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

function sortByDate(a, b) {
	return new Date(a.metadata.date) < new Date(b.metadata.date) ? 1 : -1;
}

function getLastModifiedDate(filePath) {
	const buffer = execSync(`git log -1 --pretty="format:%ci" ${filePath}`);

	if (!buffer) {
		return null;
	}

	return buffer.toString().trim();
}
