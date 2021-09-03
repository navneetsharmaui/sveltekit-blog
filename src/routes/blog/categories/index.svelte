<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		return {
			props: {
				blogs: await fetch('/blog.json').then((res) => res.json()),
			},
		};
	}
</script>

<script lang="ts">
	// Start: Local Imports
	// Components
	import HeadTags from '$components/head-tags/HeadTags.svelte';

	// Models
	import type { IBlogLayout } from '$lib/models/interfaces/iblog-layout.interface';
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	// End: Local Imports

	export let blogs!: IBlogLayout[];
	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */
	const metaData: Partial<IMetaTagProperties> = {
		title: 'Search Blogs | Sveltekit Blog',
		description: 'Search Blog page of Sveltekit blog starter project',
		url: '/blog/categories',
		keywords: ['sveltekit', 'sveltekit starter', 'sveltekit starter about'],
		searchUrl: '/blog/categories',
	};
	// End: Local component properties
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: Blog page section -->
<div class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 dark:text-white"> Search Blogs </h1>
	<div class="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
		<p> List of blogs </p>

		<ul>
			{#each blogs as blog, index (blog.slug)}
				<li>
					<a sveltekit:prefetch href="{`/blog/${blog.slug}`}">{blog.title}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
<!-- End: Blog page section -->
