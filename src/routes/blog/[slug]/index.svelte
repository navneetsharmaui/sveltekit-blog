<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const res = await fetch(`/blog/${page.params.slug}.json`);
		return {
			props: {
				blog: await res.json(),
			},
		};
	}
</script>

<script lang="ts">
	import { parseISO, format } from 'date-fns';
	// Start: Local Imports
	// Components
	import BlogLayout from '$layouts/blog-layout/BlogLayout.svelte';
	import HeadTags from '$components/head-tags/HeadTags.svelte';

	// Models
	import type { IBlogMD } from '$models/interfaces/iblog-md.interface';
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	// End: Local Imports

	// Start: Exported Properties
	export let blog!: IBlogMD;
	// End: Exported Properties

	// Start: Local component properties

	/**
	 * @type {IMetaTagProperties}
	 */
	let metaData: Partial<IMetaTagProperties> = {
		title: `${blog.metadata.title} | Sveltekit`,
		description: `${blog.metadata.description}`,
		url: `/blog/${blog.metadata.slug}`,
		keywords: ['sveltekit blog', 'sveltekit starter', 'svelte starter', 'svelte', ...blog.metadata.tags],
		searchUrl: `/blog/${blog.metadata.slug}`,
		image: `/images/blogs/${blog.metadata.slug}/images/banner.jpg`,
		twitter: {
			label1: 'Written by',
			data1: blog.metadata.author,
			label2: 'Published on',
			data2: format(parseISO(blog.metadata.date), 'MMMM dd, yyyy'),
		},
		openGraph: {
			type: 'article',
		},
	};

	// Start: Reactive properties
	$: {
		if (blog && blog.metadata.slug) {
			metaData = {
				title: `${blog.metadata.title} | Sveltekit`,
				url: `/blog/${blog.metadata.slug}`,
				keywords: ['sveltekit blog', 'sveltekit starter', 'svelte starter', 'svelte', ...blog.metadata.tags],
				searchUrl: `/blog/${blog.metadata.slug}`,
				description: `${blog.metadata.description}`,
				image: `/images/blogs/${blog.metadata.slug}/images/banner.jpg`,
				twitter: {
					label1: 'Written by',
					data1: blog.metadata.author,
					label2: 'Published on',
					data2: format(parseISO(blog.metadata.date), 'MMMM dd, yyyy'),
				},
				openGraph: {
					type: 'article',
				},
			};
		}
	}
	// End: Reactive properties

	// End: Local component properties
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<BlogLayout blog="{blog}">
	{#if blog}
		{@html blog.html}
	{/if}
</BlogLayout>
