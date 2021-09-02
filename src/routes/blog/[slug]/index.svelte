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
		title: `${blog.title} | Sveltekit`,
		description:
			'Sveltekit starter project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).',
		url: `/${blog.slug}`,
		keywords: ['sveltekit', 'sveltekit starter', 'sveltekit starter users'],
		searchUrl: `/${blog.slug}`,
	};

	// Start: Reactive properties
	$: {
		if (blog && blog.slug) {
			metaData = {
				title: `${blog.title} | Sveltekit`,
				url: `/users/${blog.slug}`,
				keywords: ['sveltekit', 'sveltekit-starter', 'sveltekit-starter-users', `sveltekit ${blog.title}`],
				searchUrl: `/users/${blog.slug}`,
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
