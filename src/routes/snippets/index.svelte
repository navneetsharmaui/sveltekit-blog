<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		return {
			props: {
				snippets: await fetch('/snippets.json').then((res) => res.json()),
			},
		};
	}
</script>

<script lang="ts">
	// Start: Local Imports
	// Components
	import HeadTags from '$components/head-tags/HeadTags.svelte';
	import SnippetCard from '$ui/components/snippet-card/SnippetCard.svelte';

	// Models
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	import type { ISnippet } from '$models/interfaces/isnippet.interface';
	// End: Local Imports

	export let snippets!: ISnippet[];
	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */
	const metaData: Partial<IMetaTagProperties> = {
		title: 'Snippets | Sveltekit Blog',
		description: 'Snippets page of Sveltekit blog starter project',
		url: '/snippets',
		keywords: ['sveltekit', 'sveltekit starter', 'sveltekit snippets'],
		searchUrl: '/snippets',
	};

	// End: Local component properties

	// Local Methods
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: Blog page section -->
<div class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white"> Code Snippets </h1>
	<p class="text-gray-600 dark:text-gray-400 mb-4">
		These are a collection of code snippets I've used in the past and saved. Some are Serverless Functions, which
		include set up instructions. Others are anything from random CSS snippets to Node.js scripts.
	</p>
	<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4">
		{#each snippets as snippet, index (snippet.slug)}
			<SnippetCard
				title="{snippet.title}"
				slug="{snippet.slug}"
				logo="{snippet.logo}"
				description="{snippet.description}"
			/>
		{/each}
	</div>
</div>
<!-- End: All the blogs section -->

<!-- End: Blog page section -->
