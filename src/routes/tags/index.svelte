<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }: LoadInput) {
		return {
			props: {
				blogs: await fetch('/blog.json').then((res) => res.json()),
			},
		};
	}
</script>

<script lang="ts">
	// Start: Local Imports
	import type { LoadInput } from '@sveltejs/kit';
	// Components
	import HeadTags from '$components/head-tags/HeadTags.svelte';

	// Models
	import type { IBlog } from '$models/interfaces/iblog.interface';

	import { convertToSlug } from '$utils/convert-to-slug';
	// End: Local Imports

	export let blogs!: IBlog[];
	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */

	// End: Local component properties
	let listWithDuplicatetags: string[] = [];

	blogs.forEach((blog) => {
		listWithDuplicatetags =
			listWithDuplicatetags.length === 0 ? [...blog.tags] : [...listWithDuplicatetags, ...blog.tags];
	});
	$: tags = [...new Set(listWithDuplicatetags)];

	$: metaData = {
		title: 'Tags | Sveltekit Blog',
		description: 'Tags page of Sveltekit blog starter project',
		url: '/tags',
		keywords: ['sveltekit', 'sveltekit starter', 'sveltekit starter tags', 'svelte starter tags', ...tags],
		searchUrl: '/tags',
	};

	// Local Methods
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: Blog page section -->
<div class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white"> Tags </h1>
	<p class="text-gray-600 dark:text-gray-400 mb-4">
		There are {tags.length} different tags to which the blogs belongs to. You can use the following tags to get the blogs/articles
		which belongs to them. These tags will help you find the articles easily if you know which tag they belongs to.
	</p>
	<div class="flex flex-row flex-wrap w-full mt-4 items-center">
		{#each tags as tag, index (tag)}
			<a
				sveltekit:prefetch
				href="{`/tags/${convertToSlug(tag)}`}"
				aria-label="{tag}"
				class="text-xs text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500"
			>
				{tag.toUpperCase()}
			</a>
			{#if index !== tags.length - 1}
				<p class="mr-2 ml-2 text-gray-500 dark:text-gray-50">
					{` • `}
				</p>
			{/if}
		{/each}
	</div>
</div>
<!-- End: All the blogs section -->

<!-- End: Blog page section -->
